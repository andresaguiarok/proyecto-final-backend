const { Router } = require("express")
const authentication = require("../middleware/authentication.js")
const UserManager = require("../dao/mongoDb/userManagerMongo.js")

const userManager = new UserManager()
const router = Router()

router.post("/register", async(req,res) => {
    try {
        const {firtsName, lastName, userName, email, password} = req.body
        const user = await userManager.createUser(firtsName, lastName, userName, email, password)

        user.firtsName && user.lastName 
        ? res.status(200).send({status:"success", message:`The user ${user.firtsName} ${user.lastName} registered successfully`})
        : res.status(404).send(user)

    } catch (error) {
        console.log(error);
    }
})

router.post("/login", async(req, res) => {
    try {
        const {email , password} = req.body
        const user = await userManager.getUser(email, password)
        req.session.user = user

        if(email === "adminCoder@coder.com" && password === "adminCod3r123") req.session.user.role = "admin"

        req.session.user.role ? res.redirect("/api/productos") : res.send(user)
    } catch (error) {
        console.log(error);
    }
})

router.get("/privada", authentication, (req,res) => {
    res.send("Podes ver los productos")
})


router.get("/logout", authentication, (req, res) => {
    req.session.destroy( error => {
        if(error){
           return res.send({status: "error", message: error})
        }else {
            res.redirect("/login")
        }
    })
})


module.exports = router