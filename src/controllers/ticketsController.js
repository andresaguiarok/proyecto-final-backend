const { ticketService } = require("../service/services")

class TicketController{

    getTickets = async(req,res) => {
        try {
            const tickets = await ticketService.getTickets()

            tickets
            ? res.send({status:"success", payload: tickets}) 
            : res.status(501).send({status:"Error", message:"No users tickets found"})
        } catch (error) {
            console.log(error);
        }
    }

    getTicket = async(req,res) => {
        const {tid} = req.params
        const ticket = await ticketService.getTicket(tid)

        ticket 
        ? res.status(200).send({status:"success", toTicketIs: ticket}) 
        : res.status(404).send({status:"Error", message:"Your ticket does not exist"})
    }
}

module.exports = TicketController