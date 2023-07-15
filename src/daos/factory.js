const config = require("../config/objetConfig.js");

let UserDao
let ProductDao
let CartDao
let TicketDao

switch (config.persistence) {
    case "MONGO":
        config.connectDB()

        const UserDaoMongo    = require("./mongoDb/userDaoMongo.js")
        const CartDaoMongo    = require("./mongoDb/cartDaoMongo.js")
        const ProductDaoMongo = require("./mongoDb/productDaoMongo.js")
        const TicketDaoMongo  = require("./mongoDb/ticketDaoMongo.js")

        UserDao               = new UserDaoMongo()
        CartDao               = new CartDaoMongo()
        ProductDao            = new ProductDaoMongo()
        TicketDao             = new TicketDaoMongo()
        break;
    case "MONGOTEST":
        config.connectDB()
        
        const UserDaoTest     = require("./mongoDb/userDaoMongo.js")
        const CartDaoTest     = require("./mongoDb/cartDaoMongo.js")
        const ProductDaoTest  = require("./mongoDb/productDaoMongo.js")
        const TicketDaoTest   = require("./mongoDb/ticketDaoMongo.js")
    
        UserDao               = new UserDaoTest()
        CartDao               = new CartDaoTest()
        ProductDao            = new ProductDaoTest()
        TicketDao             = new TicketDaoTest()
        break;
    case "FILE":
        const UserDaoFs       = require("./fileSystem/userDaoFs.js")
        const CartDaoFs       = require("./fileSystem/cartDaoFs.js")
        const ProductDaoFs    = require("./fileSystem/productDaoFs.js")
        const TicketDaoFs     = require("./fileSystem/ticketDaoFs.js")
   
        UserDao               = new UserDaoFs()
        CartDao               = new CartDaoFs() 
        ProductDao            = new ProductDaoFs()
        TicketDao             = new TicketDaoFs()
        break;
}

module.exports = {
    UserDao,
    ProductDao,
    CartDao,
    TicketDao
}