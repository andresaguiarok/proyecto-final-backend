const dotenv          = require("dotenv")
const { commander }   = require("../utils/commander")
const MongoSingleton  = require("../utils/singleton")
const { mode }        = commander.opts()

dotenv.config({ path: mode === 'development' ? './.env.development' : './.env.production'})

console.log(process.env.PERSISTENCE);
module.exports = {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    JwtKeySecret: process.env.JWT_KEY_SECRET,
    gmailUser: process.env.GMAIL_USER_APP,
    gmailPassword: process.env.GMAIL_PASSWORD_APP,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    myPhone: process.env.MY_PHONE,
    connectDB: async() => await MongoSingleton.getInstance()
}
