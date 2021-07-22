import { useState, useEffect } from "react";

import "./App.css";
import socket from "./utilities/socketConnection";
import Widget from "./Widget";

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    socket.on("data", (data) => {
      setPerformanceData((old) => {
        old[data.macA] = data;
        return {
          ...old,
        };
      });
    });
  });

  return (
    <div className='App'>
      {Object.values(performanceData).map((value, index) => {
        return <Widget key={index} data={value} />;
      })}
    </div>
  );
}

export default App;
