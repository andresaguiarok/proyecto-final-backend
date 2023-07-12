const { v4:uuidv4 } = require("uuid")
const { CustomError } = require("../customErrors/customError.js")
const { typeErrors } = require("../customErrors/typeErrors.js")
const { generateInfoProductError } = require("../customErrors/info.js")
const { productService } = require("../service/services.js")

class ProductController {

    getProductsAll = async (req, res) => {
        try {
            const {page=1} = req.query
            const { sort="asc" } = req.query
    
            let products = await productService.getProducts(page, sort)
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products
    
            if(page > totalPages || page < 1) throw({status: "Error", message: "Page not found"})
    
            if(!products) throw({status: "Error", message: "Documents not found"})
            
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
            let product = await productService.getProduct({_id: pid})
    
            if(!product) throw({ status: "Error", message: "Product not found"}) 
    
            res.status(200).send({
                status: "The product has been found successfully",
                payload: product
            })
        } catch (error) {
            res.status(404).send(error)
        }
    }

    createProduct = async (req, res, next) => {
        try {
            const {title, description, price, thumbnails, stock} = req.body
            const code = uuidv4()

            //validacion si los campos estan vacios
            if(!title || !description || !price || !thumbnails || !stock){
                CustomError.createError({
                    name: "Error creating product",
                    cause: generateInfoProductError({title, description, price, thumbnails, stock, code}),
                    message: "Error trying to create product",
                    code: typeErrors.INVALID_TYPE_ERROR,
                })
            }

            //validacion si el code del producto ya existe
            if(await productService.getProduct({code})){
                CustomError.createError({
                    name: "Error creating product",
                    cause: generateInfoProductError({title, description, price, thumbnails, stock, code}),
                    message: "Existing code error",
                    code: typeErrors.INVALID_TYPE_ERROR,
                })
            }

            let result = await productService.addProduct(title, description, price, thumbnails, code ,stock)

            result ? res.status(200).send({ status: "A product has been created successfully", payload: result })
            : res.status(404).send({ status:"Error", error: "Something went wrong" })
        } catch(error){
            next(error)
        }
    }

    updateProduct = async (req, res) => {
        try {
            let {pid} = req.params
            let updateBody = req.body
    
            let result = await productService.updateProduct(pid,updateBody)

            if(!result) throw({status:"Error", message:"Could not update the product"})
    
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

            if(!result) throw({status:"Error", message:"Could not delete product"})

            if(result) return res.status(200).send({ status: "The product is deleted successfully", payload: result })
        } catch (error) {
            res.status(404).send(error)
        }
    }
}

module.exports = ProductController