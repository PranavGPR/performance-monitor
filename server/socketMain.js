require("dotenv").config();

const { MONGO_URL } = process.env;

const mongoose = require("mongoose");
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Machine = require("./models/Machine");

function socketMain(io, socket) {
  let macA;

  socket.on("clientAuth", (key) => {
    if (key === "328y4iu32rkuj3gfhg") {
      socket.join("clients");
    } else if (key === "sFhdkFeuwE34nhsd5Jb") {
      socket.join("ui");
      console.log("A react client has joined");
      Machine.find({}, (err, docs) => {
        docs.forEach((doc) => {
          doc.isActive = false;
          io.to("ui").emit("data", doc);
        });
      });
    } else {
      socket.disconnect(true);
    }
  });

  socket.on("disconnect", () => {
    Machine.find({ macA }, (err, docs) => {
      if (docs.length > 0) {
        docs[0].isActive = false;
        io.to("ui").emit("data", docs[0]);
      }
    });
  });

  socket.on("initPerfData", async (data) => {
    macA = data.macA;
    const res = await checkAndAdd(data);
  });

  socket.on("perfData", (data) => {
    io.to("ui").emit("data", data);
  });
}

function checkAndAdd(data) {
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        throw err;
        reject(err);
      } else if (doc === null) {
        let newMachine = new Machine(data);
        newMachine.save();
        resolve("Record added!");
      } else {
        resolve("Record found!");
      }
    });
  });
}

module.exports = socketMain;
