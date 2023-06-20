const { userModel } = require("../dao/models/usersModel.js")
const UserManager = require("../dao/mongoDb/userManagerMongo.js")
const { validPassword } = require("../utils/bcryptHash.js")
const userManager = new UserManager()
const { generateToken } = require("../utils/jsonWebToken.js")

class SessionController {

    register = async (req,res) => {
        try {
            const {firtsName, lastName, userName, email, birthDate, password} = req.body

            // // //validacion si vienen los campos vacios
            if(firtsName == "" || lastName == "" || email == "" || password == "" || userName == "" || birthDate == ""){
                throw({status: "error" ,message:"Fill in the missing fields"})
            }

            // //valida si existe email
            if(await userModel.findOne({email})){
                throw({status:"error", message:"This email is registered"})
            }

            //valida si existe el userName
            if(await userModel.findOne({userName})){
                throw({status:"error", message:"This user already exists"})
            } 

            const user = await userManager.createUser(firtsName, lastName, userName, email, birthDate, password)
            let Accesstoken = generateToken({ firtsName, lastName, email })
    
            if(user.firtsName && user.lastName){
                res.status(201).send({
                    status:"success", 
                    message:`The user ${user.firtsName} ${user.lastName} registered successfully`, Accesstoken
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body

            //Validacion de campos vacios  
            if(email === "" || password === ""){
                throw({status:"error", message:"Fill in the missing fields"})
            } 

            //Validacion si no existe el email
            const userData = await userModel.findOne({email})
            if(!userData){
                throw({status:"error", message:"Invalid email"})
            }

            //Validacion si existe o no el password
            if(!validPassword(password, userData)){
                throw({status:"error", password:"Invalid password"})
            } 

            const user = await userManager.getUser(email)
            
            if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
                user.role = "admin"
            }
            
            let Accesstoken = generateToken(user)
            req.user = user
            console.log(req.user.role);

            req.user.role
            ? res.status(200).cookie("CoderCookieToken", Accesstoken, { maxAge: 60 * 60 * 100, httpOnly: true }).redirect("/api/productos")
            : res.status(404).send({status:"Erorr"})

        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }

    infoCurrent = async(req,res) => {
        res.status(200).send(req.user)
    }

    privada = async(req,res) => {
        res.send(`Podes ver los productos ${req.user.userName} `)
    }

    gitHub = async(req,res) => {
        res.send({status:"success", message: "Created"})
    }

    gitHubCall = async(req,res) => {
        let Accesstoken = generateToken(req.user)
        res.status(200).cookie("CoderCookieToken", Accesstoken,{maxAge: 60*60*100, httpOnly: true}).redirect("/api/productos")
    }

    logout = async(req, res) => {
        res.clearCookie("CoderCookieToken").redirect("/login")
    }

}

module.exports = SessionController