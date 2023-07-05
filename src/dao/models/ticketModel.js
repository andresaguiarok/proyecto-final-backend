const {Schema, model} = require("mongoose")

const collection = "tickets"

const ticketSchema = new Schema({
    code:{
        type: String,
    },
    purchaseDatetime:{
        type: Date
    },
    amount:{
        type:Number
    },
    purchaser:{ 
        type:String,
        required: true
    }
})

const ticketModel = model(collection, ticketSchema)

module.exports = {
    ticketModel
}