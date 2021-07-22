import io from "socket.io-client";

let socket = io.connect("http://localhost:5000");

socket.emit("clientAuth", "sFhdkFeuwE34nhsd5Jb");

export default socket;
