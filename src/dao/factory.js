const config = require("../config/objetConfig.js");

let UserDao
let ProductDao
let CartDao
let TicketDao

switch (config.persistence) {
    case "MONGO":
        config.connectDB()

        const UserDaoMongo     = require("./mongoDb/userDaoMongo.js")
        const CartDaoMongo     = require("./mongoDb/cartDaoMongo.js")
        const ProductDaoMongo  = require("./mongoDb/productDaoMongo.js")
        const TicketDaoMongo   = require("./mongoDb/ticketDaoMongo.js")

        ProductDao             = new ProductDaoMongo()
        UserDao                = new UserDaoMongo()
        CartDao                = new CartDaoMongo()
        TicketDao              = new TicketDaoMongo()
        break;
    case "MONGOTEST":
        config.connectDB()
        const UserManagerMongoTest = require("./mongoDb/userDaoMongo.js")
        const CartManagerMongoTest = require("./mongoDb/cartDaoMongo.js")
        const ProductManagerMongoTest = require("./mongoDb/productDaoMongo.js")
        const TicketManagerTest = require("./mongoDb/ticketDaoMongo.js")
    
        ProductDao = new ProductManagerMongoTest()
        UserDao = new UserManagerMongoTest()
        CartDao = new CartManagerMongoTest()
        TicketDao = new TicketManagerTest()
        break;
    case "FILE":
        const UserDaoFs    = require("./fileSystem/userDaoFs.js")
        const CartDaoFs    = require("./fileSystem/cartDaoFs.js")
        const ProductDaoFs = require("./fileSystem/productDaoFs.js")
        const TicketDaoFs  = require("./fileSystem/ticketDaoFs.js")

        ProductDao         = new ProductDaoFs()
        UserDao            = new UserDaoFs()
        CartDao            = new CartDaoFs() 
        TicketDao          = new TicketDaoFs()
        break;
}

module.exports = {
    UserDao,
    ProductDao,
    CartDao,
    TicketDao
}