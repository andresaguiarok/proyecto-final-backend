const { Router } = require("express")
const ProductManagerMongo = require("../dao/mongoDb/productManagerMongo.js")

const router = Router()
const pm = new ProductManagerMongo()

router.get("/", async (req, res) => {
    try {
        const {page=1} = req.query
        const { sort="asc" } = req.query

        let products = await pm.getProduct(page, sort)
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = products

        if(!hasNextPage){
            res.send({
                status: "error",
                payload: "Page no existe"
            })
        }

        if(!products){
            res.send({
                status: "error",
                payload: "Documentos no encontrados"
            })
        }
        
        res.render("home", {
            title: "Home",
            style: "home.css",
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        })
       // res.send(products)
    } catch (error) {
        console.log(error);
    }
})

router.get("/:pid", async (req, res) => {
    try {
        let {pid} = req.params
        let product = await pm.getProductByID(pid)

        if (!product){
             return res.status(404).send({status: "error", mensaje: "Este Producto no existe"}) 
        }

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