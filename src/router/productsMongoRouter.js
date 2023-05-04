const { Router } = require("express")
const ProductManagerMongo = require("../dao/mongoDb/productManagerMongo.js")

const router = Router()
const pm = new ProductManagerMongo()

router.get("/", async (req, res) => {
    try {
        const products = await pm.getProduct()
        res.status(200).send({
            status: "information was successfully extracted from the database",
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
            status: "the product has been found successfully",
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
            status: "a product has been created successfully",
            payload: result
        })
    } catch (error) {
        console.log(error);
    }
})

router.put("/:pid", async (req, res) => {
    try {
        let {pid} = req.params
        let obj = req.body

        let result = await pm.updateProduct(pid,obj)

        res.status(200).send({
            status: "the product was successfully updated",
            payload: result
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        let {pid} = req.params
        let result = await pm.deleteProduct(pid)
        res.status(200).send({
            status: "the product is deleted successfully",
            payload: result
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router