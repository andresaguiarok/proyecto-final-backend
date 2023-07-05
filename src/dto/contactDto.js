class ContactDto {
    constructor(contact){
        this.fullName = `${contact.firtsName} ${contact.lastName}`,
        this.email = contact.email,
        this.birthDate = contact.birthDate.toLocaleDateString(),
        this.role = contact.role
    }
}

module.exports = {
    ContactDto
}