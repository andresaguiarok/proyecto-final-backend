const {Schema, model} = require("mongoose")

const collection = "messages"

const messageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: String
})

const messageModel = model(collection, messageSchema)

module.exports = messageModel