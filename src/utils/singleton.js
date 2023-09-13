const {connect}   = require("mongoose")
const { logger }  = require("../utils/logger.js");

class MongoSingleton {
    static #instance
    constructor(){
        connect(process.env.MONGO_KEY_SECRET, {useNewUrlParser: true, useUnifiedTopology: true})
    }
    static getInstance(){
        if(this.#instance){
            logger.info("The server is already connected to the database");
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        logger.info("The server connected to the database")
        return this.#instance
    }
}

module.exports = MongoSingleton