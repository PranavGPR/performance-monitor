import Cpu from "./Cpu";
import Info from "./Info";
import Mem from "./Mem";

function Widget() {
  return (
    <div>
      <h1>Widget!</h1>
      <Cpu />
      <Info />
      <Mem />
    </div>
  );
}

export default Widget;
