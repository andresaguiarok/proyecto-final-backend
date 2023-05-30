const { Router } = require("express")
const authentication = require("../middleware/authentication.js")
const UserManager = require("../dao/mongoDb/userManagerMongo.js")
const passport = require("passport")

const userManager = new UserManager()
const router = Router()

//Con userManager
// router.post("/register", async(req,res) => {
//     try {
//         const {firtsName, lastName, userName, email, password} = req.body
//         const user = await userManager.createUser(firtsName, lastName, userName, email, password)

//         user.firtsName && user.lastName 
//         ? res.status(200).send({status:"success", message:`The user ${user.firtsName} ${user.lastName} registered successfully`})
//         : res.status(404).send(user)

//     } catch (error) {
//         console.log(error);
//     }
// })

//Con passport register
router.post("/register", passport.authenticate("register", {failureRedirect: "/api/session/failRegister"}) ,async(req,res) => {
    res.send({status:"success", message:"user registered"})
})

router.get("/failRegister", async(req,res) => {
    res.send({status:"error", error: "fallo registro"})
})

// Con passport login
router.post("/login", passport.authenticate("login", {failureRedirect: "/api/session/failLogin"}) ,async(req,res) => {
    if(!req.user) return res.status(404).send({status:"error", message:"Invalid credencial"})
    req.session.user = req.user

    res.redirect("/api/productos")
})

router.get("/failLogin", async(req,res) => {
    res.send({status:"error", error: "fallo login"})
})

//Login con userManager
// router.post("/login", async(req, res) => {
//     try {
//         const {email , password} = req.body
//         const user = await userManager.getUser(email, password)
//         req.session.user = user

//         console.log(req.session.user);
//         if(email === "adminCoder@coder.com" && password === "adminCod3r123") req.session.user.role = "admin"

//         req.session.user.role ? res.redirect("/api/productos") : res.status(404).send(user)
//     } catch (error) {
//         console.log(error);
//     }
// })

router.get("/privada", authentication, (req,res) => {
    res.send("Podes ver los productos")
})

router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async(req,res) => {
    res.send({status:"success", message:"registro success"})
})

router.get("/githubcall",passport.authenticate("github", {failureRedirect:"/login"}),async(req,res) => {
    req.session.user = req.user
    res.redirect("/api/productos")
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