const { Router } = require("express")
const TicketManager = require("../dao/mongoDb/ticketManager")
const router = new Router()
const ticketManager = new TicketManager()

router.get("/", async(req,res) => {
    const tickets = await ticketManager.getTickets()
    res.send({status:"success", payload: tickets})
})

router.get("/:tid", async(req,res) => {
    const {tid} = req.params
    const ticket = await ticketManager.getTicket(tid)

    res.status(200).send({status:"success", toTicketIs: ticket})
})

module.exports = router