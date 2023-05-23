const {Router} = require("express")

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




module.exports = router