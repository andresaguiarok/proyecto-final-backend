const twilio = require("twilio")
const Config = require("../config/objetConfig.js")

const twilioSid = Config.twilioAccountSid
const twilioToken = Config.twilioAuthToken
const twilioPhone = Config.twilioPhoneNumber

const cliente = twilio(twilioSid, twilioToken)

exports.sendSms = (user) => cliente.messages.create({
    body: `The data of the user ${user.firtsName} was updated`,
    from: twilioPhone,
    to: Config.myPhone

})
