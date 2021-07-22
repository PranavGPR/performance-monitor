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
    isActive,
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

  let notActiveDiv = "";
  if (!isActive) {
    notActiveDiv = <div className='not-active'>Offline</div>;
  }

  return (
    <div className='widget col-sm-12'>
      {notActiveDiv}
      <Cpu cpuData={cpu} />
      <Mem memData={mem} />
      <Info infoData={info} />
    </div>
  );
}

export default Widget;
