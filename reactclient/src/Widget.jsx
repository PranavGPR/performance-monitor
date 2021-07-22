import Cpu from "./Cpu";
import Info from "./Info";
import Mem from "./Mem";
import "./widget.css";

function Widget(props) {
  const {
    cpuModel,
    cpuLoad,
    cpuSpeed,
    freeMem,
    macA,
    memUsage,
    numCores,
    // isActive,
    osType,
    totalMem,
    upTime,
    usedMem,
  } = props.data;

  const cpuWidgetId = `cpu-widget-${macA}`;
  const memWidgetId = `mem-widget-${macA}`;

  const cpu = { cpuLoad, cpuWidgetId };
  const mem = { totalMem, usedMem, memUsage, freeMem, memWidgetId };
  const info = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };

  return (
    <div>
      <Cpu cpuData={cpu} />
      <Mem memData={mem} />
      <Info infoData={info} />
    </div>
  );
}

export default Widget;
