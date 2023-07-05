const { UserDao, ProductDao, CartDao } = require("../dao/factory.js");
const { ContactRepository } = require("../repositories/contactRepository.js");

const userService = UserDao
const productService = ProductDao
const cartService = CartDao
const contactService = new ContactRepository(UserDao)

module.exports = {
    userService,
    productService,
    cartService,
    contactService
}