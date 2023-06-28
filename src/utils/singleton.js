const {connect} = require("mongoose")

class MongoSingleton {
    static #instance
    constructor(){
        connect(process.env.MONGO_KEY_SECRET, {useNewUrlParser: true, useUnifiedTopology: true})
    }
    static getInstance(){
        if(this.#instance){
            console.log("The server is already connected to the database");
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.log("The server connected to the database")
        return this.#instance
    }
}

module.exports = MongoSingleton