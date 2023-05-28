const { creaHash, validPassword } = require("../../utils/bcryptHash")
const { userModel } = require("../models/usersModel")

class UserManager {
    async createUser(firtsName, lastName, userName, email, password){
        try {
            const newUser = { firtsName, lastName, userName, email, password: creaHash(password) }

            // //validacion si vienen los campos vacios
            if(firtsName == "" || lastName == "" || email == "" || password == "" || userName == ""){
               throw({status: "error" ,message:"Fill in the missing fields"})
            }

            // //valida si existe email
            const userEmail = await userModel.findOne({email})
            if(userEmail) throw({status:"error", message:"This email is registered"})

            // //valida si existe el userName
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
            let role = "user"
            
            //Validacion de campos vacios  
            if(email === "" || password === "") throw({status:"error", message:"Fill in the missing fields"})

            //Validacion si existe el email
            if(!userDB) throw({status:"error", message:"Invalid email"})

            //Validacion si existe password
            if(!validPassword(password, userDB)) throw({status:"error", password:"Invalid password"})

            const user = {
                firtsName: userDB.firtsName,
                lastName: userDB.lastName,
                email: userDB.email,
                userName: userDB.userName,
                role: role
            }

            return user
        } catch (error) {
            return error
        }
    }

    async updateUser(){}

    async deleteUser(){}

}

module.exports = UserManager