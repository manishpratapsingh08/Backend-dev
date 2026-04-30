const fs = require('fs');
const os = require('os');
const path = require('path');

const logFile = path.join(__dirname, 'system_info.log');

function getSystemInfo() {
  return {
    timestamp: new Date().toISOString(),
    platform: os.platform(),
    release: os.release(),
    cpuCount: os.cpus().length,
    cpuModel: os.cpus()[0].model,
    totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
    freeMemoryMB: Math.round(os.freemem() / 1024 / 1024),
    uptimeSeconds: Math.round(os.uptime()),
  };
}

function logSystemInfo() {
  const info = getSystemInfo();
  const line = `${info.timestamp} | platform=${info.platform} | release=${info.release} | cpu=${info.cpuCount}x${info.cpuModel} | totalMem=${info.totalMemoryMB}MB | freeMem=${info.freeMemoryMB}MB | uptime=${info.uptimeSeconds}s\n`;

  fs.appendFile(logFile, line, 'utf8', (err) => {
    if (err) {
      console.error('Unable to write system info:', err.message);
    }
  });
}

console.log('System information logger started. Writing every 5 seconds to', logFile);
logSystemInfo();
setInterval(logSystemInfo, 5000);
