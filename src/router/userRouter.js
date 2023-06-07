const {Router} = require("express")
const {userModel} = require("../dao/models/usersModel.js")
const UserManager = require("../dao/mongoDb/userManagerMongo.js")

const router = Router()
const userManager = new UserManager()

router.get("/", async(req, res) => {
    try {
        let users = await userManager.getUsers()
        console.log(users);
        
        res.send({
            status:"information was successfully extracted from the database",
            payload: users
        })
    } catch (error) {
       console.log(error); 
    }
})

router.get("/:uid", async(req, res) => {
    try {
        let {uid} = req.params
        let user = await userManager.getUserr(uid)
        if(!user) return res.send({status:"error", message: "no se encontro el usuario"})
        
        res.send({
            status:"the user was found",
            payload: user
        })
    } catch (error) {
       console.log(error); 
    }
})

router.post("/" , async(req,res) => {
    try {
        let user = req.body

        const newUser = {
            firtsName: user.nombre,
            lastName: user.apellido,
            email: user.email
        }

        let result = await userModel.create(newUser)

        res.send({
            status : "User was successfully created",
            payload: result
        })
    } catch (error) {
        console.log(error);
    }
})

router.put("/:uid", async(req, res) => {
    try {
        const {uid} = req.params
        const user = req.body

        let userToReplace = {
            firtsName: user.nombre,
            lastName: user.apellido,
            email: user.email
        }

        let result = await userModel.updateOne({_id: uid}, userToReplace)

        res.send({
            status : "User information was updated",
            payload: result
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:uid", async(req, res) => {
    try {
        let {uid} = req.params
        let users = await userModel.deleteOne({_id: uid})
        
        res.send({
            status:"the user was deleted",
            payload: users
        })
    } catch (error) {
       console.log(error); 
    }
})

module.exports = router
