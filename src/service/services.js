const { UserDao, ProductDao, CartDao } = require("../dao/factory.js");
const userService = UserDao
const productService = ProductDao
const cartService = CartDao

module.exports = {
    userService,
    productService,
    cartService
}