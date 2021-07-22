const mongoose = require("mongoose");

const Machine = new mongoose.Schema({
  macA: String,
  freeMem: Number,
  totalMem: Number,
  usedMem: Number,
  memUsage: Number,
  osType: String,
  upTime: Number,
  cpuModel: String,
  numCores: Number,
  cpuSpeed: Number,
  cpuLoad: Number,
});

module.exports = mongoose.model("Machine", Machine);
