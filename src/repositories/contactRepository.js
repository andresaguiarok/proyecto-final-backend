const { ContactDto } = require("../dto/contactDto")

class ContactRepository {
    constructor(dao){
        this.dao = dao
    }

    getContact = async(user) => {
        const contact = await this.dao.getUser(user)
        return new ContactDto(contact)
    }
}

module.exports = {
    ContactRepository
}