const winston          = require("winston")
const { commander }    = require("../utils/commander")
const { mode }         = commander.opts()
let logger

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        http: 3,
        info: 4,
        debug: 5,
    },
    colors: {
        fatal: "magenta",
        error: "red",
        warning: "yellow",
        http: "cyan",
        info: "blue",
        debug: "green",
    }
}

switch (mode) {
    case "development":
        logger = winston.createLogger({
            levels: customLevels.levels,
            transports: [
                new winston.transports.Console({
                    level: process.env.LEVEL_LOGGER,
                    format: winston.format.combine(
                        winston.format.simple(),
                        winston.format.colorize({colors: customLevels.colors, all: true}),
                        winston.format.printf(info => `[${info.level}] ${info.message}`)
                    )
                })
            ]
        })
        break;
    case "production":
        logger = winston.createLogger({
            levels: customLevels.levels,
            transports: [
                new winston.transports.File({
                    filename: "./error.log", 
                    level: "error",
                    format: winston.format.simple()
                })
            ]
        })
    break;
}

const addLogger = (req,res,next) => {
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    next()
}

module.exports = {
    logger,
    addLogger
}