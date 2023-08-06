const cluster          = require("node:cluster")
const { cpus }         = require("node:os")
const { startServer }  = require("./src/server.js");
const { logger }       = require("./src/utils/logger.js");
const numeroDeCpu      = cpus().length

// if(cluster.isPrimary){
//     logger.info("proceso primario")
//     for (let index = 0; index < numeroDeCpu; index++) {
//         cluster.fork()
//     }
//     cluster.on("message", worker => {
//         logger.info(`El worker ${worker.process.id} dice ${worker.message} `)
//     })
// }else {
//     logger.info("soy un proceso secundario, soy un worker")
// }

startServer()
