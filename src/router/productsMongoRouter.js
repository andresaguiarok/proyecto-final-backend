const { Router } = require("express")
const ProductManagerMongo = require("../dao/mongoDb/productManagerMongo.js")
const passport = require("passport")

const router = Router()
const pm = new ProductManagerMongo()

//Vista de los productos
router.get("/", passport.authenticate("jwt", { session: false }),async (req, res) => {
    try {
        const {page=1} = req.query
        const { sort="asc" } = req.query

        let products = await pm.getProduct(page, sort)
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = products

        if(!hasNextPage){
            res.send({
                status: "error",
                message: "Page not found"
            })
        }

        if(!products){
            res.send({
                status: "error",
                message: "Documents not found"
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
            user: req.user
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/:pid", async (req, res) => {
    try {
        let {pid} = req.params
        let product = await pm.getProductByID(pid)

        if (!product){
            res.status(404).send({
                status: "error", 
                message: "Product not found"
            }) 
        }

        res.status(200).send({
            status: "The product has been found successfully",
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
            status: "A product has been created successfully",
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
            status: "The product was successfully updated",
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
            status: "The product is deleted successfully",
            payload: result
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router