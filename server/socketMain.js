require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/perfData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Machine = require("./models/Machine");

function socketMain(io, socket) {
  let macA;

  socket.on("clientAuth", (key) => {
    if (key === process.env.CLIENT_KEY) {
      socket.join("clients");
    } else if (key === process.env.UI_KEY) {
      socket.join("ui");
    } else {
      socket.disconnect(true);
    }
  });

  socket.on("initPerfData", (data) => {
    macA = data.macA;
    checkAndAdd(macA);
  });

  socket.on("perfData", (data) => {
    console.log(data);
  });
}

module.exports = socketMain;
