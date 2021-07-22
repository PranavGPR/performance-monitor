import drawCircle from "./utilities/canvasLoadAnimation";

function Cpu(props) {
  const canvas = document.querySelector(`.${props.cpuData.cpuWidgetId}`);
  drawCircle(canvas, props.cpuData.cpuLoad);

  return (
    <div className='col-sm-3 cpu'>
      <h3>CPU Load</h3>
      <div className='canvas-wrapper'>
        <canvas
          className={props.cpuData.cpuWidgetId}
          width='200'
          height='200'
        ></canvas>
        <div className='cpu-text'>{props.cpuData.cpuLoad}%</div>
      </div>
    </div>
  );
}

export default Cpu;
