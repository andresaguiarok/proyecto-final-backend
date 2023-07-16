const nodeMailer = require("nodemailer")
const objectConfig = require("../config/objectConfig")

const transport = nodeMailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: objectConfig.gmailUser,
        pass: objectConfig.gmailPassword
    }
})

module.exports = transport