const { ContactDto } = require("../dto/contactDto")

class ContactRepository {
    constructor(dao){
        this.dao = dao
    }

    getContact = async(user) => {
        const contact = await this.dao.getByUser(user)
        return new ContactDto(contact)
    }
}

module.exports = {
    ContactRepository
}