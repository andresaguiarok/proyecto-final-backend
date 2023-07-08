const dotenv = require("dotenv")
const { commander } = require("../utils/commander")
const MongoSingleton = require("../utils/singleton")

const { mode } = commander.opts()
dotenv.config({ path: mode === 'development' ? './.env.development' : './.env.production'})

console.log(process.env.PERSISTENCE);
module.exports = {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    JwtKeySecret: process.env.JWT_KEY_SECRET,
    gmailUser: process.env.GMAIL_USER_APP,
    gmailPassword: process.env.GMAIL_PASSWORD_APP,
    connectDB: async() => await MongoSingleton.getInstance()
}
