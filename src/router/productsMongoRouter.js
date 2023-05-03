const { Router } = require("express")
const ProductManagerMongo = require("../dao/mongoDb/productManagerMongo.js")

const router = Router()
const pm = new ProductManagerMongo()

router.get("/", async (req, res) => {
    try {
        const products = await pm.getProduct()
        res.status(200).send({
            status: "success",
            payload: products
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/:pid", async (req, res) => {
    try {
        let {pid} = req.params
        let product = await pm.getProductByID(pid)
        res.status(200).send({
            status: "success",
            payload: product
        })
    } catch (error) {
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    try {
        const product = req.body
        let result =  await pm.addProduct(product)
        res.status(200).send({
            status: "success",
            payload: result
        })
    } catch (error) {
        console.log(error);
    }
})

router.put("/pid", async (req, res) => {
    try {
        
        res.send("hola mundo actualizo un prod")
    } catch (error) {
        console.log(error);
    }
})

router.delete("/pid", async (req, res) => {
    try {
        
        res.send("hola mundo borro un prod")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router