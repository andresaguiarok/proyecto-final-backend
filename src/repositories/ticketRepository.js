const { logger } = require("../utils/logger.js");

class TicketRepository {
    constructor(dao){
        this.dao = dao
    }

    getTickets = async() => {
        try {
            return await this.dao.get()
        } catch (error) {
            logger.error(error)
        }
    }

    getTicket = async(tid) => {
        try {
            return await this.dao.getById(tid)
        } catch (error) {
            logger.error(error)
        }
    }

    createTicket = async(ticket) => {
        try {
            return await this.dao.create(ticket)
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = {
    TicketRepository
}