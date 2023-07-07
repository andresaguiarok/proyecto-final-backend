class TicketRepository {
    constructor(dao){
        this.dao = dao
    }

    getTickets = async() => {
        try {
            return await this.dao.get()
        } catch (error) {
            console.log(error);
        }
    }

    getTicket = async(tid) => {
        try {
            return await this.dao.getById(tid)
        } catch (error) {
            console.log(error);
        }
    }

    createTicket = async(ticket) => {
        try {
            return await this.dao.create(ticket)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    TicketRepository
}