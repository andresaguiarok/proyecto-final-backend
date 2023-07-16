const twilio   = require("twilio")
const Config   = require("../config/objectConfig.js")
const cliente  = twilio(Config.twilioAccountSid, Config.twilioAuthToken)

exports.sendSms = (user) => cliente.messages.create({
    body: `The data of the user ${user.firtsName} was updated`,
    from: Config.twilioPhoneNumber,
    to: Config.myPhone

})
