const { Router } = require("express")
const { ticketService } = require("../service/services")
const router = new Router()

router.get("/", async(req,res) => {
    const tickets = await ticketService.getTickets()
    res.send({status:"success", payload: tickets})
})

router.get("/:tid", async(req,res) => {
    const {tid} = req.params
    const ticket = await ticketService.getTicket(tid)

    res.status(200).send({status:"success", toTicketIs: ticket})
})

module.exports = router