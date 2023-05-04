const { Router } = require ("express")
const ProductManager = require("../dao/fileSystem/productManager.js")

const consulta = async()=>  {
    const pm = new ProductManager()
    const router = Router()

    router.get("/", async(req, res) => {
        let products = await pm.getProducts()

        prodManag = {
            title: "Products",
            products,
            style: "index.css"
        }
        res.render("home", prodManag)
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
}

consulta()

