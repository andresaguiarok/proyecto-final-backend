const { Router } = require ("express")

const router = Router()

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
