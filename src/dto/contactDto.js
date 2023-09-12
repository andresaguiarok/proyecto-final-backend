class ContactDto {
    constructor(contact){
        this._id = contact._id,
        this.fullName = `${contact.firtsName} ${contact.lastName}`,
        this.email = contact.email,
        this.birthDate = contact.birthDate,
        this.role = contact.role,
        this.lastConnection = contact.lastConnection
    }
}

module.exports = {
    ContactDto
}