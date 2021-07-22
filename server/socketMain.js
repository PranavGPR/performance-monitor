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
    if (key === CLIENT_KEY) {
      socket.join("clients");
    } else if (key === UI_KEY) {
      socket.join("ui");
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
    console.log(data);
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
