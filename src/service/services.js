const { UserDao, ProductDao, CartDao, TicketDao } = require("../dao/factory.js");
const { ContactRepository } = require("../repositories/contactRepository.js");
const { ProductsRespository } = require("../repositories/productRepository.js")
const { CartRepository } = require("../repositories/cartRepository.js")
const { UserRepository } = require("../repositories/userRepository.js")
const { TicketRepository } = require("../repositories/ticketRepository.js")

const userService = new UserRepository(UserDao)
const productService = new ProductsRespository(ProductDao)
const cartService = new CartRepository(CartDao)
const ticketService = new TicketRepository(TicketDao)
const contactService = new ContactRepository(UserDao)

module.exports = {
    userService,
    productService,
    cartService,
    ticketService,
    contactService
}