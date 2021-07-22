require("dotenv").config();

function socketMain(io, socket) {
  socket.on("clientAuth", (key) => {
    if (key === process.env.CLIENT_KEY) {
      socket.join("clients");
    } else if (key === process.env.UI_KEY) {
      socket.join("ui");
    } else {
      socket.disconnect(true);
    }
  });

  socket.on("perfData", (data) => {
    console.log(data);
  });
}

module.exports = socketMain;
