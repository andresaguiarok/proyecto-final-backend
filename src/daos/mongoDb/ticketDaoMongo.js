const { ticketModel } = require("../models/ticketModel")
const { logger }      = require("../../utils/logger.js");

class TicketDaoMongo{

    async create(ticket){
        try {
            return await ticketModel.create(ticket)
        } catch (error) {
            logger.error(error)
        }
     }

     async get(){
        try {
            return await ticketModel.find()
        } catch (error) {
            logger.error(error)
        }
     }

    async getById(id){
       try {
           return await ticketModel.findById(id)
       } catch (error) {
            logger.error(error)
       }
    }
}

module.exports = TicketDaoMongo

