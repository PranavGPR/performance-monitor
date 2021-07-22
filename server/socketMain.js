require("dotenv").config();

const { UI_KEY, CLIENT_KEY, MONGO_URL } = process.env;

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
    } else {
      socket.disconnect(true);
    }
  });

  socket.on("initPerfData", async (data) => {
    macA = data.macA;
    const res = await checkAndAdd(data);
    console.log(res);
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
