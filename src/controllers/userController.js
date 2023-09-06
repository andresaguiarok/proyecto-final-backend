const { userService, cartService }  = require("../service/services.js");
const objectConfig                  = require("../config/objectConfig.js");
const { logger }                    = require("../utils/logger.js");
const { sendSms }                   = require("../utils/twilioMessage.js");
const moment                        = require("moment");
const transport                     = require("../utils/nodeMailer.js")

class UserController{

    getAllUsers = async(req, res) => {
        try {
            const usersDb  = await userService.getUsers()
            const users    = usersDb.map((
                { _id, firtsName, lastName, email, role, lastConnection}
            ) => ({_id, firtsName, lastName, email, role, lastConnection})) 

            res.render("usersPanel", {
                title: "Users Panel",
                style: "usersPanel.css",
                users
            })
            // users
            // ? res.status(200).send({ status:"information was successfully extracted from the database", payload: users })
            // : res.status(500).send({ status:"Error", message: "No user data found" })
            
        } catch (error) {
           console.log(error); 
        }
    }

    getById = async(req, res) => {
        try {
            const {uid} = req.params
            const user  = await userService.getUser({_id: uid})

            !user
            ? res.send({ status:"error", message: "User not available" })
            : res.send({ status:"the user was found",payload: user })
        } catch (error) {
           console.log(error); 
           return res.status(411).send(error) 
        }
    }

    uploadDocuments = async(req, res) => {
        try {
            const {uid}  = req.params
            const user   = await userService.getUser({_id: uid})
            const files  = req.files

            if(files){
                files.forEach(async file => {
                    await userService.updateUser(
                        {_id: uid},
                        {$addToSet: 
                            {documents: 
                                {name: file.filename, reference:file.destination, docType:file.fieldname}
                            }
                        }
                    )
                });
                return res.status(201).send({
                    status: "success",
                    message:`${user.firtsName} the ${files.map(file => file.fieldname)} files were uploaded successfully`
                })
            } else {
                return res.status(400).send({status: "error", message: "error trying to upload files"})
            }

        } catch (error) {
            console.log(error);
        }
    }

    updateOldUser = async(req, res) => {
        try {
            const {uid}         = req.params
            const userToReplace = req.body
            const user          = await userService.getUser({_id: uid})
            let result          = await userService.updateUser({_id: uid}, userToReplace)

            if(!user) throw({status:"Error", message:"User not found"})

            if(result){
                await sendSms(user)
                res.send({
                    status : "User information was updated",
                    payload: result
                })
            }else{
                throw({status:"Error", message:"Could not update user data"})
            }
        } catch (error) {
            console.log(error);
            return res.status(410).send(error) 

        }
    }

    changeOfRole = async(req, res) => {
        try {
            let {uid}          = req.params
            let user           = await userService.getUser({_id: uid})
            const requiredDocs = user.documents.some((doc) => doc.docType.includes("identity" && "myAddress" && "myAccount"))

            if(!user) return logger.error("User not found")

            if(requiredDocs){
                user.role == "user"
                ? await userService.updateUser({_id: uid}, {role: "premium"}) 
                    && res.send({status:"success", message: "You are now a premium user"})
                : await userService.updateUser({_id: uid}, {role: "user"}) 
                    && res.send({status:"success", message:"Now you are a common user"})  
            }else {
                return res.status(403).send({status: "error", message: "you need to upload documents to be premium"})
            }
        } catch (error) {
           console.log(error); 
        }
    }

    deleteByUser = async(req, res) => {
        try {
            let {uid} = req.params
            let user = await userService.getUser({_id: uid})

            if(user){
                await userService.deleteUser({_id: uid})
                await cartService.deleteCart({_id: user.cart._id})

                res.send({ status:"the user was deleted", payload: user }) 
            }else{
                throw({ status:"Error", message:"Could not delete user" })
            }
        } catch (error) {
           console.log(error); 
           return res.status(400).send(error) 
        }
    }

    deleteInactiveUsers = async(req, res) => {
        try {
            const usersDb = await userService.getUsers()
            
            usersDb.forEach(async({_id, email, lastConnection, cart, firtsName}) => {
                const lastConnec = moment(lastConnection, "DD-MM-YYYY")
                const diferencia = moment().diff(lastConnec, 'days')

                if(diferencia > 2 || !lastConnection){
                    await userService.deleteUser({_id})
                    await cartService.deleteCart({_id: cart})
                    await transport.sendMail({
                        from: objectConfig.gmailUser,
                        to: email,
                        subject: "Inactivity",
                        html:`<div>
                                    <h1>
                                        Hello ${firtsName}, we deleted your account due to inactivity
                                    </h1>
                                    <a href="http://localhost:8080/register"> Re-register your user </a>
                              </div>`
                    })
                }
            })

            usersDb 
            ? res.send({status: "success", message: "removed some inactive users"}) 
            : res.send({status: "erorr", message: "There was a server error"})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    UserController
}