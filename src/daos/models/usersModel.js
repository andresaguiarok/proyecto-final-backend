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
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    },
    birthDate:{
        type: Date,
    },
    role: {
        type: String,
        default: "user"
    },
    documents: [{
        name: String,
        reference: String
    }],
    lastConnection: {
        type: Date
    }
})

const userModel = model(collection, userSchema)

module.exports = {
    userModel
}