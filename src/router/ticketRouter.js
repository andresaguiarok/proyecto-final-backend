const { Router } = require("express")
const passportCall = require("../passportJwt/passportCall")
const { authorization } = require("../passportJwt/authorization")
const TicketController = require("../controllers/ticketsController")

const router = new Router()
const ticketController = new TicketController()

router.get("/", passportCall("jwt"), authorization("admin"),ticketController.getTickets)

router.get("/:tid", passportCall("jwt"), authorization("user"),ticketController.getTicket)

module.exports = router