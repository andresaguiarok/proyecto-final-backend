const { ticketModel } = require("../models/ticketModel")

class TicketManager {

    async createTicket(ticket){
        try {
            return await ticketModel.create(ticket)
        } catch (error) {
            console.log(error);
        }
     }

     async getTickets(){
        try {
            return await ticketModel.find()
        } catch (error) {
            console.log(error);
        }
     }

    async getTicket(tid){
       try {
           return await ticketModel.findById(tid)
       } catch (error) {
           console.log(error);
       }
    }
}

module.exports = TicketManager

