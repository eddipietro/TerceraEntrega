const info = (_req, res) => {
    const numCPUs = require("os").cpus().length;
    const data = {
      directActual: process.cwd(),
      idProcess: process.pid,
      versionNode: process.version,
      routeEjec: process.execPath,
      opSys: process.platform,
      cantProcesadores: numCPUs,
      memory: JSON.stringify(process.memoryUsage().rss, null, 2),
    };
  
    console.log(data);
    return res.render("info", data);
  };
  
  module.exports = {
    info,
  };