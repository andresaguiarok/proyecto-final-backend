const { userService, cartService }  = require("../service/services.js");
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
            let {uid} = req.params
            let user = await userService.getUser({_id: uid})
            if(!user) return res.send({status:"error", message: "User not available"})
            
            res.send({
                status:"the user was found",
                payload: user
            })
        } catch (error) {
           console.log(error); 
           return res.status(411).send(error) 
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