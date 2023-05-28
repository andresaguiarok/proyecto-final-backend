const { userModel } = require("../models/usersModel")

class UserManager {
    async createUser(firtsName, lastName, userName, email, password){
        try {
            const newUser = { firtsName, lastName, userName, email, password }

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
            const userEmail = await userModel.findOne({email})
            const userPassword = await userModel.findOne({password})
            let role = "user"
            
            //Validacion de campos vacios  
            if(email === "" || password === "") throw({status:"error", message:"Fill in the missing fields"})

            //Validacion si existe el email
            if(!userEmail && userPassword) throw({status:"error", message:"Invalid email"})

            //Validacion si existe password
            if(!userPassword && userEmail) throw({status:"error", password:"Invalid password"})

            //Validacion si existe el usuario
            if(!userEmail && !userPassword) throw({status:"error", message:"This user does not exist"})

            const user = {
                firtsName: userEmail.firtsName,
                lastName: userEmail.lastName,
                email: userEmail.email,
                userName: userEmail.userName,
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