const { Router } = require ("express")
const ProductManager = require("../managers/productManager.js")

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

    module.exports = router
}

consulta()

