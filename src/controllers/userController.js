const { userService, cartService }  = require("../service/services.js");
const { logger }                    = require("../utils/logger.js");
const { sendSms }                   = require("../utils/twilioMessage.js");

class UserController{

    getAllUsers = async(req, res) => {
        try {
            const users = await userService.getUsers()
            
            if(users){
                res.status(200).send({
                    status:"information was successfully extracted from the database",
                    payload: users
                })
            }else{
                throw({status:"Error", message: "No user data found"})
            }
            
        } catch (error) {
           console.log(error);
           return res.status(500).send(error) 
        }
    }

    getById = async(req, res) => {
        try {
            const {uid} = req.params
            const user = await userService.getUser({_id: uid})

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
            const {uid} = req.params
            const user = await userService.getUser({_id: uid})
            const files = req.files

            if(files){
                files.forEach(async file => {
                    await userService.updateUser(
                        {_id: uid}, {$addToSet: {documents: {name: file.filename, reference:file.destination}}}
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
            const {uid} = req.params
            const userToReplace = req.body
            const user = await userService.getUser({_id: uid})
            let result = await userService.updateUser({_id: uid}, userToReplace)

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
            let {uid} = req.params
            let user = await userService.getUser({_id: uid})

            if(!user) return logger.error("User not found")

            switch (user.role) {
                case "user":
                    await userService.updateUser({_id: uid}, {role: "premium"})
                    return res.send({status:"success", message: "You are now a premium user"})
                case "premium":
                    await userService.updateUser({_id: uid}, {role: "user"})
                    return res.send({status:"success", message:"Now you are a common user"})
            }
            logger.info(user.role)
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
}

module.exports = {
    UserController
}