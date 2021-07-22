const os = require("os");
const io = require("socket.io-client");
let socket = io("http://localhost:5000");

socket.on("connect", () => {
  const nI = os.networkInterfaces();
  let macA;
  for (let key in nI) {
    if (!nI[key][1].internal) {
      macA = nI[key][0].mac;
      break;
    }
  }
  // client auth with single key value
  socket.emit("clientAuth", "328y4iu32rkuj3gfhg");

  let perfDataInterval = setInterval(() => {
    performanceData().then((data) => {
      socket.emit("perfData", data);
    });
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(perfDataInterval);
  });
});

function performanceData() {
  return new Promise(async (resolve, reject) => {
    const cpus = os.cpus();
    const osType = os.type();
    const uptime = os.uptime();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;
    const cpuModel = cpus[0].model;
    const cpuSpeed = cpus[0].speed;
    const numCores = cpus.length;

    const cpuLoad = await getCpuLoad();
    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      uptime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad,
    });
  });
}

function cpuAverage() {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((core) => {
    for (type in core.times) {
      totalMs += core.times[type];
    }

    idleMs += core.times.idle;
  });
  return { idle: idleMs / cpus.length, total: totalMs / cpus.length };
}

function getCpuLoad() {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;

      const percentageCpu =
        100 - Math.floor((100 * idleDifference) / totalDifference);
      resolve(percentageCpu);
    });
  }, 100);
}
