const { Router } = require("express")
const UserManager = require("../dao/mongoDb/userManagerMongo.js")
const passport = require("passport")
const { generateToken } = require("../utils/jsonWebToken.js")
const passportCall = require("../passportJwt/passportCall.js")
const { authorization } = require("../passportJwt/authorization.js")

const userManager = new UserManager()
const router = Router()

//Con passport register
// router.post("/register", passport.authenticate("register", {failureRedirect: "/api/session/failRegister"}) ,async(req,res) => {
//     req.session.user = req.user
//     res.send({status:"success", message:`user ${req.session.user.firtsName} registered`})
// })

// router.get("/failRegister", async(req,res) => {
//     res.send({status:"error", error: "fallo registro"})
// })

// Con passport login
// router.post("/login", passport.authenticate("login", {failureRedirect: "/api/session/failLogin"}) ,async(req,res) => {
//     if(!req.user) return res.status(404).send({status:"error", message:"Invalid credencial"})
//     req.session.user = req.user

//     res.redirect("/api/productos")
// })

// router.get("/failLogin", async(req,res) => {
//     res.send({status:"error", error: "fallo login"})
// })

// Con userManager
router.post("/register", async(req,res) => {
    try {
        const {firtsName, lastName, userName, email, birthDate, password} = req.body
        const user = await userManager.createUser(firtsName, lastName, userName, email, birthDate, password)
        let Accesstoken = generateToken({ firtsName, lastName, email })

        user.firtsName && user.lastName 
        ? res.status(200).send({status:"success", message:`The user ${user.firtsName} ${user.lastName} registered successfully`, Accesstoken})
        : res.status(404).send(user)

    } catch (error) {
        console.log(error);
    }
})

//Login con userManager
router.post("/login", async(req, res) => {
    try {
        const {email , password} = req.body
        const user = await userManager.getUser(email, password)
        let Accesstoken = generateToken(user)
        req.user = user

        if(email === "adminCoder@coder.com" && password === "adminCod3r123") req.user.role = "admin"

        req.user.role ? res.status(200).cookie("CoderCookieToken", Accesstoken,{maxAge: 60*60*100, httpOnly: true}).redirect("/api/productos") 
        : res.status(404).send(user)
        
    } catch (error) {
        console.log(error);
    }
})

router.get("/current", passportCall("jwt"), authorization("user"),(req,res) => {
    res.status(200).send(req.user)
})

router.get("/privada", passport.authenticate("jwt",{session:false}), (req,res) => {
    res.send(`Podes ver los productos ${req.user.userName} `)
})

router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async(req,res) => {
    res.send({status:"success", message:"registro success"})
})

router.get("/githubcall",passport.authenticate("github", {failureRedirect:"/login"}),async(req,res) => {
    let Accesstoken = generateToken(req.user)
    res.status(200).cookie("CoderCookieToken", Accesstoken,{maxAge: 60*60*100, httpOnly: true}).redirect("/api/productos")
})

router.get("/logout", passport.authenticate("jwt",{session:false}),(req, res) => {
    res.clearCookie("CoderCookieToken").redirect("/login")
})


module.exports = router