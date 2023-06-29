const CartManager = require("../dao/mongoDb/cartManagerMongo.js");
const ProductManagerMongo = require("../dao/mongoDb/productManagerMongo.js");
const UserManagerMongo = require("../dao/mongoDb/userManagerMongo.js");

const userService = new UserManagerMongo()
const productService = new ProductManagerMongo()
const cartService = new CartManager()

module.exports = {
    userService,
    productService,
    cartService
}