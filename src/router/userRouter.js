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
        let user = await userManager.getUser({_id: uid})
        if(!user) return res.send({status:"error", message: "no se encontro el usuario"})
        
        res.send({
            status:"the user was found",
            payload: user
        })
    } catch (error) {
       console.log(error); 
    }
})

router.put("/:uid", async(req, res) => {
    try {
        const {uid} = req.params
        const userToReplace = req.body

        let result = await userManager.updateUser({_id: uid}, userToReplace)

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
        let users = await userManager.deleteUser({_id: uid})
        
        res.send({
            status:"the user was deleted",
            payload: users
        })
    } catch (error) {
       console.log(error); 
    }
})

module.exports = router
