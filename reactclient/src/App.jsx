import { useState, useEffect } from "react";

import "./App.css";
import socket from "./utilities/socketConnection";
import Widget from "./Widget";

console.log(socket);

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    socket.on("data", (data) => {
      console.log(data);
    });
  });

  return (
    <div className='App'>
      <Widget />
    </div>
  );
}

export default App;
