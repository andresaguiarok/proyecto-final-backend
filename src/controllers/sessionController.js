const objectConfig                     = require("../config/objectConfig.js")
const { userService, contactService }  = require("../service/services.js")
const { validPassword, creaHash }      = require("../utils/bcryptHash.js")
const { generateToken,
     generateTokenUrl }                = require("../utils/jsonWebToken.js")
const transport                        = require("../utils/nodeMailer.js")
const { logger } = require("../utils/logger.js")
class SessionController {

    register = async (req,res) => {
        try {
            const {firtsName, lastName, userName, email, birthDate, password} = req.body
            
            //validacion si vienen los campos vacios
            if(firtsName == "" || lastName == "" || email == "" || 
            password == "" || userName == "" || birthDate == ""){
                throw({status: "error" ,message:"Fill in the missing fields"})
            }
            //valida si existe email
            if(await userService.getUser({email})){
                throw({status:"Error", message:"This email is registered"})
            }

            //valida si existe el userName
            if(await userService.getUser({userName})) {
                throw({status:"Error", message:"Username is not available"})
            }

            const user = await userService.createUser({firtsName, lastName, userName, email, birthDate, password: creaHash(password)})
            let Accesstoken = generateToken({ firtsName, lastName, email })
            res.status(201).send({
                status:"success", 
                message:`The user ${user.firtsName} ${user.lastName} registered successfully`, Accesstoken
            })   
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await userService.getUser({email})

            //Validacion de campos vacios  
            if(email === "" || password === "") throw({status:"error", message:"Fill in the missing fields"}) 

            //Validacion si no existe el email
            if(!user) throw({status:"error", message:"Invalid email"})

            //Validacion si existe o no el password
            if(!validPassword(password, user)) throw({status:"error", message:"Invalid password"})
 
            //Validacion de usuario ADMIN
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
                user.role = "admin"
            }
            
            let Accesstoken = generateToken(user)
            req.user = user

            req.user.role
            ? res.status(200).cookie("CoderCookieToken", Accesstoken, { maxAge: 60 * 60 * 1000, httpOnly: true }).redirect("/api/products")
            : res.status(404).send({status:"Error"})

        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }

    recoverPassword = async(req, res) => {
        try {
            const { email } = req.body
            
            if(email === "") return res.status(428).send({status:"Error", message:"Enter email"})

            const user = await userService.getUser({email})

            if(!user) {
                return res.status(502).send({status:"Error", message:"The user could not be found in the database"})
            }

            if(user){
                const urlToken = generateTokenUrl(user)
                await transport.sendMail({
                    from: objectConfig.gmailUser,
                    to: user.email,
                    subject: "Change of password",
                    html:`<div>
                                <h1>
                                    Go to this link to change the password
                                </h1>
                                <a href="http://localhost:8080/login/change-of-password"> Change of password </a>
                          </div>`
                })
                res.cookie("CoderCookieToken", urlToken, { maxAge: 60 * 60 * 100, httpOnly: true })
                return res.status(200).send({status:"Success", message:"An email was sent to verify your identity"})
            }
        } catch (error) {
            console.log(error)
        }
    }

    changePassword = async(req, res) =>{
        try {
            const user = req.user
            const { password, verifyPassword } = req.body

            if(password == "" || verifyPassword =="") {
                return res.status(400).send({status:"Error", message:"Fill in the required fields"})
            }

            if(password !== verifyPassword) {
                return res.status(400).send({status:"Error", message:"Password does not match"})
            }

            if(!validPassword(verifyPassword, user)){
                await userService.updateUser({_id: user._id}, {password: creaHash(verifyPassword)})
                res.status(200).send({
                    status:"Success", message:`Have you updated your password ${user.firtsName}`
                })
            }else {
                return res.status(400).send({
                    status:"error", message:"You can not enter the same current password"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    infoCurrent = async(req,res) => {
        const {email} = req.user
        const contact = await contactService.getContact({email})

        contact 
        ? res.status(200).send({status:"success", toInfo: contact}) 
        : res.status(404).send({status:"Error", message:"Your information does not exist"})
    }

    privada = async(req,res) => {
        res.send(`Podes ver los productos ${req.user.userName} `)
    }

    gitHub = async(req,res) => {}

    gitHubCall = async(req,res) => {
        let Accesstoken = generateToken(req.user)
        res.status(200).cookie("CoderCookieToken", Accesstoken,{maxAge: 60*60*100, httpOnly: true}).redirect("/api/productos")
    } 

    logout = async(req, res) => {
        res.clearCookie("CoderCookieToken").redirect("/login")
    }

}

module.exports = SessionController