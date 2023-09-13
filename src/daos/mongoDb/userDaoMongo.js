const { userModel } = require("../models/usersModel.js")
const { logger }    = require("../../utils/logger.js");
const CartDaoMongo  = require("./cartDaoMongo.js")
const cart = new CartDaoMongo()

class UserDaoMongo{
    async create({firtsName, lastName, userName, email, birthDate, password}){
        try {
            return await userModel.create({ 
                firtsName, lastName, userName, email, birthDate,
                password, cart: await cart.create()
            })
        } catch (error) {
            logger.error(error)
        }
    }

    async getByUser(userData){
        try {
            return await userModel.findOne({...userData})
        } catch (error) {
            logger.error(error)
        }
    }

    async get(){
        try {
            return await userModel.find()
        } catch (error) {
            logger.error(error)
        }
    }

    async update(id, updateBody){
        try {
            return await userModel.updateOne({_id: id}, updateBody)
        } catch (error) {
            logger.error(error)
        }
    }

    async delete(id){
        try {
            return await userModel.deleteOne({_id: id})
        } catch (error) {
            logger.error(error)
        }
    }

}

module.exports = UserDaoMongo