const dotenv = require("dotenv")
const { commander } = require("../utils/commander")
const MongoSingleton = require("../utils/singleton")

const { mode } = commander.opts()
dotenv.config({ path: mode === 'development' ? './.env.development' : './.env.production' })

module.exports = {
    port: process.env.PORT,
    JwtKeySecret: process.env.JWT_KEY_SECRET,
    connectDB: async() => await MongoSingleton.getInstance()
}
