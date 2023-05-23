const { Router } = require ("express")

const router = Router()

router.get("/login", (req,res)=> {
    res.render("login" , {title : "Log In", style: "login.css"})
})

router.get("/register", (req,res)=> {
    res.render("register" , {title : "Register", style: "register.css"})
})

router.get("/realTimeProducts", (req, res) =>{
    view = {
        title: "RealTimeProducts",
        style: "index.css"}
    res.render("realTimeProducts", view)
})

router.get("/chat", (req, res) => {
    view = {
        title: "Chat",
        style: "chat.css"
    }
    res.render("chat", view)
})

module.exports = router
