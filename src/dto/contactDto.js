class ContactDto {
    constructor(contact){
        this.fullName = `${contact.firtsName} ${contact.lastName}`,
        this.email = contact.email,
        this.birthDate = contact.birthDate.toLocaleDateString(),
        this.role = contact.role,
        this.lastConnection = contact.lastConnection.toLocaleString()
    }
}

module.exports = {
    ContactDto
}