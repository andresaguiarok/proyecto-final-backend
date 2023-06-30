const { productModel } = require("../dao/models/productModel.js")
const { productService } = require("../service/services.js")

class ProductController {

    getProductsAll = async (req, res) => {
        try {
            const {page=1} = req.query
            const { sort="asc" } = req.query
    
            let products = await productService.getProducts(page, sort)
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products
    
            if(page > totalPages || page < 1) throw({status: "error",message: "Page not found"})
    
            if(!products) throw({status: "error",message: "Documents not found"})
            
            res.render("home", {
                title: "Home",
                style: "home.css",
                products: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                page,
                user: req.user
            })
        } catch (error) {
            res.status(404).send(error)
        }
    }

    getProduct = async (req, res) => {
        try {
            let {pid} = req.params
            let product = await productService.getProductByID(pid)
    
            if(!product) throw({ status: "error", message: "Product not found"}) 
    
            res.status(200).send({
                status: "The product has been found successfully",
                payload: product
            })
        } catch (error) {
            res.status(404).send(error)
        }
    }

    createProduct = async (req, res) => {
        try {
            const {title, description, price, thumbnails, code, stock} = req.body

            //validacion si los campos estan vacios
            if(title === "" || description === "" || price === "" || thumbnails === "" || code === "" || stock === ""){
                throw({status: "error" ,message:"Fill in the missing fields"})
            }

            //validacion si el code del producto ya existe
            if(await productModel.findOne({code})){
                throw({status:"error", message: "code already entered"})
            }

            let result =  await productService.addProduct(title, description, price, thumbnails, code, stock)

            result 
            ?res.status(200).send({
                status: "A product has been created successfully",
                payload: result
            })
            :res.status(404).send({
                status:"error",
                error: "something went wrong"
            })
        } catch (error) {
            res.status(404).send(error)
        }
    }

    updateProduct = async (req, res) => {
        try {
            let {pid} = req.params
            let obj = req.body
    
            let result = await productService.updateProduct(pid,obj)

            if(!result) throw({status:"error", message:"could not update the product"})
    
            if(result){
                res.status(200).send({
                    status: "The product was successfully updated",
                    payload: result
                })
            }
        } catch (error) {
            res.status(404).send(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            let {pid} = req.params

            let result = await productService.deleteProduct(pid)

            if(!result) throw({status:"error", message:"could not delete product"})

            if(result) return res.status(200).send({ status: "The product is deleted successfully", payload: result })
        } catch (error) {
            res.status(404).send(error)
        }
    }
}

module.exports = ProductController