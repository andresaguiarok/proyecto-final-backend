const {Schema, model} = require("mongoose")

const collection = "users"

const userSchema = new Schema ({
    firtsName: {
        type: String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
})

const userModel = model(collection, userSchema)

module.exports = {
    userModel
}