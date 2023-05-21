const {Router} = require("express")
const authentication = require("../middleware/authentication.js")
const router = Router()

// router.get("/setCookie" , (req, res) => {
//     res.cookie("CodeCookie", "Cookie poderosa", {maxAge: 100000}).send("cookie seteada")
// })

// router.get("/getCookie", (req,res) =>{
//     res.send(req.cookies)
// })

// router.get("/setSignedCookie" , (req, res) => {
//     res.cookie("SignedCookie", "Cookie muy poderosa", {maxAge:100000, signed:true}).send("Signed seteada")
// })

// router.get("/getSignedCookie", (req,res) =>{
//     res.send(req.signedCookies)
// })

// router.get("/deleteCookie", (req,res) =>{
//     res.clearCookie("CoderCookie").send("Cookie delete")
// })

router.get("/", (req,res)=> {
    res.render("login" , {title : "Login", style: "login.css"})
})

router.post("/setCookieUser", (req,res)=> {
    const {userName , email} = req.body

    res.cookie(userName , email , {maxAge: 10000, signed: true}).send({cookie:"cookie seteada"})
})

//session 

// router.get("/session", (req, res) => {
//     if(req.session.counter){
//         req.session.counter++
//         res.send(`tu visita n° ${req.session.counter} al sitio`)
//     }else{
//         req.session.counter = 1
//         res.send("bienvenido")
//     }
// })

router.post("/session", (req, res) => {
    const {userName , password} = req.body
    if(userName !== "andy" || password !== "andy123"){
        return res.send("fallo de login")
    }

    req.session.user = userName
    req.session.admin = true
    req.session.counter

    if(!req.session.counter){
        req.session.counter = 1
        res.send(`Bienvenido ${userName}`)  
    }else{
        req.session.counter++
        res.send(`${userName} esta es tu visita n° ${req.session.counter} al sitio`)
    }
    
    console.log(req.session);
    res.send("login success")
})

router.get("/privada", authentication, (req,res) => {
    res.send("Podes ver los productos")
})

router.get("/logout", (req, res) => {
    req.session.destroy( error => {
        if(error){
           return res.send({status: "error", message: error})
        }else {
            res.send("Logout ok")
        }
    })
})

module.exports = router