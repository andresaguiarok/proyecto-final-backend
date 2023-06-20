const { creaHash } = require("../../utils/bcryptHash.js")
const { userModel } = require("../models/usersModel.js")
const CartManager = require("./cartManagerMongo.js")
const cartManager = new CartManager()

class UserManager {
    async createUser(firtsName, lastName, userName, email, birthDate, password){
        try {
            return await userModel.create({ 
                firtsName, lastName, userName, email, birthDate,
                password: creaHash(password), cart: await cartManager.createCart() 
            })
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async getUser(email){
        try {
            const userDB = await userModel.findOne({email})

            const user = {
                _id: userDB._id,
                firtsName: userDB.firtsName,
                lastName: userDB.lastName,
                email: userDB.email,
                userName: userDB.userName,
                birthDate: userDB.birthDate.toISOString().substring(0,10),
                role: userDB.role
            }

            return user
        } catch (error) {
            return error
        }
    }

    async getUsers(){
        try {
            return await userModel.find()
        } catch (error) {
            console.log(error);
        }
    }

    async getUserr(uid){
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