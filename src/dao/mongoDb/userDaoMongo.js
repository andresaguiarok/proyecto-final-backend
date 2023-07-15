const { userModel } = require("../models/usersModel.js")
const CartDaoMongo = require("./cartDaoMongo.js")
const cart = new CartDaoMongo()

class UserDaoMongo{
    async create({firtsName, lastName, userName, email, birthDate, password}){
        try {
            return await userModel.create({ 
                firtsName, lastName, userName, email, birthDate,
                password, cart: await cart.create()
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getByUser(userData){
        try {
            return await userModel.findOne({...userData})
        } catch (error) {
            console.log(error);
        }
    }

    async get(){
        try {
            return await userModel.find()
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, updateBody){
        return await userModel.updateOne({_id: id}, updateBody)
    }

    async delete(id){
        return await userModel.deleteOne({_id: id})
    }

}

module.exports = UserDaoMongo