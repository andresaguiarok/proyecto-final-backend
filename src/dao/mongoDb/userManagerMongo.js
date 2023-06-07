const { creaHash, validPassword } = require("../../utils/bcryptHash")
const { userModel } = require("../models/usersModel")
const CartManager = require("./cartManagerMongo")

const cartManager = new CartManager()

class UserManager {
    async createUser(firtsName, lastName, userName, email, birthDate, password){
        try {
            const newUser = { 
                firtsName, lastName, userName, email, birthDate,
                password: creaHash(password), cart: await cartManager.createCart() 
            }

            // // //validacion si vienen los campos vacios
            if(firtsName == "" || lastName == "" || email == "" || password == "" || userName == "" || birthDate == ""){
               throw({status: "error" ,message:"Fill in the missing fields"})
            }

            // //valida si existe email
            if(await userModel.findOne({email})) throw({status:"error", message:"This email is registered"})

            // // //valida si existe el userName
            const uName = await userModel.findOne({userName})
            if(uName) throw({status:"error", message:"This user already exists"})

            const userNew = await userModel.create(newUser)

            return userNew 
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async getUser(email, password){
        try {
            const userDB = await userModel.findOne({email})
            // let role = "user"
            
            //Validacion de campos vacios  
            if(email === "" || password === "") throw({status:"error", message:"Fill in the missing fields"})

            //Validacion si existe el email
            if(!userDB) throw({status:"error", message:"Invalid email"})

            //Validacion si existe password
            if(!validPassword(password, userDB)) throw({status:"error", password:"Invalid password"})

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