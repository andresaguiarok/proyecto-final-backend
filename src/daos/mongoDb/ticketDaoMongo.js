const { ticketModel } = require("../models/ticketModel")

class TicketDaoMongo{

    async create(ticket){
        try {
            return await ticketModel.create(ticket)
        } catch (error) {
            console.log(error);
        }
     }

     async get(){
        try {
            return await ticketModel.find()
        } catch (error) {
            console.log(error);
        }
     }

    async getById(id){
       try {
           return await ticketModel.findById(id)
       } catch (error) {
           console.log(error);
       }
    }
}

module.exports = TicketDaoMongo

