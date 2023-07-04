const { UserDao, ProductDao, CartDao } = require("../dao/factory.js");
// const cartManager = require("../dao/fileSystem/cartManager.js");
// const ProductManager = require("../dao/fileSystem/productManager.js");
// const UserManager = require("../dao/fileSystem/userManager.js");

// const CartManagerMongo = require("../dao/mongoDb/cartManagerMongo.js");
// const ProductManagerMongo = require("../dao/mongoDb/productManagerMongo.js");
// const UserManagerMongo = require("../dao/mongoDb/userManagerMongo.js");


const userService = UserDao
const productService = ProductDao
const cartService = CartDao

module.exports = {
    userService,
    productService,
    cartService
}