const { UserDao, ProductDao, CartDao, TicketDao } = require("../dao/factory.js");
const { ContactRepository } = require("../repositories/contactRepository.js");

const userService = UserDao
const productService = ProductDao
const cartService = CartDao
const ticketService = TicketDao
const contactService = new ContactRepository(UserDao)

module.exports = {
    userService,
    productService,
    cartService,
    ticketService,
    contactService
}