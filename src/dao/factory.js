const config = require("../config/objetConfig.js");

let UserDao
let ProductDao
let CartDao
let TicketDao

switch (config.persistence) {
    case "MONGO":
        config.connectDB()
        const ProductManagerMongo = require("./mongoDb/productManagerMongo.js");
        const UserManagerMongo = require("./mongoDb/userManagerMongo.js");
        const CartManagerMongo = require("./mongoDb/cartManagerMongo.js");
        const TicketManager = require("./mongoDb/ticketManager.js");

        ProductDao = new ProductManagerMongo()
        UserDao = new UserManagerMongo()
        CartDao = new CartManagerMongo()
        TicketDao = new TicketManager()
        break;
    case "MONGOTEST":
        config.connectDB()
        const ProductManagerMongoTest = require("./mongoDb/productManagerMongo.js");
        const UserManagerMongoTest = require("./mongoDb/userManagerMongo.js");
        const CartManagerMongoTest = require("./mongoDb/cartManagerMongo.js");
        const TicketManagerTest = require("./mongoDb/ticketManager.js");
    
        ProductDao = new ProductManagerMongoTest()
        UserDao = new UserManagerMongoTest()
        CartDao = new CartManagerMongoTest()
        TicketDao = new TicketManagerTest()
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
    CartDao,
    TicketDao
}