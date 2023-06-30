const { userModel } = require("../models/usersModel.js")
const CartManager = require("./cartManagerMongo.js")
const cartManager = new CartManager()

class UserManager {
    async createUser({firtsName, lastName, userName, email, birthDate, password}){
        try {
            return await userModel.create({ 
                firtsName, lastName, userName, email, birthDate,
                password, cart: await cartManager.createCart() 
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getUserName(userName){
        try {
            return await userModel.findOne({userName})
        } catch (error) {
            console.log(error);
        }
    }

    async getUser(email){
        try {
            return await userModel.findOne({email})
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(){
        try {
            return await userModel.find()
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(uid){
        try {
            return await userModel.findById({_id: uid})
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(){}

    async deleteUser(){}

}

module.exports = UserManager