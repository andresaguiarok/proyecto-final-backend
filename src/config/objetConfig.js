const { connect } = require("mongoose")
const dotenv = require("dotenv")
const { commander } = require("../utils/commander")

const { mode } = commander.opts()
dotenv.config({ path: mode === 'development' ? './.env.development' : './.env.production' })

let url = process.env.MONGO_KEY_SECRET

module.exports = {
    port: process.env.PORT,
    JwtKeySecret: process.env.JWT_KEY_SECRET,
    connectDB: ()=> {
        connect(url)
        console.log("Base de datos conectada")
    }
}
