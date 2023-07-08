const nodeMailer = require("nodemailer")
const objetConfig = require("../config/objetConfig")

const transport = nodeMailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: objetConfig.gmailUser,
        pass: objetConfig.gmailPassword
    }
})

module.exports = transport