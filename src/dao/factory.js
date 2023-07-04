const config = require("../config/objetConfig.js");

let UserDao
let ProductDao
let CartDao

switch (config.persistence) {
    case "MONGO":
        config.connectDB()
        const ProductManagerMongo = require("./mongoDb/productManagerMongo.js");
        const UserManagerMongo = require("./mongoDb/userManagerMongo.js");
        const CartManagerMongo = require("./mongoDb/cartManagerMongo.js");

        ProductDao = new ProductManagerMongo()
        UserDao = new UserManagerMongo()
        CartDao = new CartManagerMongo()
        break;
    case "MONGOTEST":
        config.connectDB()
        const ProductManagerMongoLocal = require("./mongoDb/productManagerMongo.js");
        const UserManagerMongoLocal = require("./mongoDb/userManagerMongo.js");
        const CartManagerMongoLocal = require("./mongoDb/cartManagerMongo.js");
    
        ProductDao = new ProductManagerMongoLocal()
        UserDao = new UserManagerMongoLocal()
        CartDao = new CartManagerMongoLocal()
        break;
    case "FILE":
        const CartManagerFs = require("./fileSystem/cartManager.js");
        const ProductManagerFs = require("./fileSystem/productManager.js");
        const UserManagerFs = require("./fileSystem/userManager.js");

        ProductDao = new ProductManagerFs()
        UserDao = new UserManagerFs()
        CartDao = new CartManagerFs() 
        break;
}

module.exports = {
    UserDao,
    ProductDao,
    CartDao
}