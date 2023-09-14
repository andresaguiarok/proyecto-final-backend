const { productService }            = require("../service/services.js")
const { v4:uuidv4 }                 = require("uuid")
const { CustomError }               = require("../customErrors/customError.js")
const { typeErrors }                = require("../customErrors/typeErrors.js")
const { generateInfoProductError }  = require("../customErrors/info.js")
const objectConfig                  = require("../config/objectConfig.js")
const transport                     = require("../utils/nodeMailer.js")
const { logger }                    = require("../utils/logger.js")

class ProductController {

    getProductsAll = async (req, res) => {
        try {
            const {page=1} = req.query
            const { sort="asc" } = req.query
    
            let products = await productService.getProducts(page, sort)
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products
    
            if(page > totalPages || page < 1) return res.status(404).send({status: "Error", message: "Page not found"})
    
            if(!products) return res.status(404).send({status: "Error", message: "Documents not found"})
            
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
            logger.error(error)
        }
    }

    getProduct = async (req, res) => {
        try {
            let {pid} = req.params
            let product = await productService.getProduct({_id: pid})
    
            if(!product) return res.status(404).send({ status: "Error", message: "Product not found"}) 
    
            res.status(200).send({
                status: "The product has been found successfully",
                payload: product
            })
        } catch (error) {
            logger.error(error)
        }
    }

    createProduct = async (req, res, next) => {
        try {
            const {title, description, price, thumbnails, stock} = req.body
            const code = uuidv4()
            const owener = req.user.email

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

            let result = await productService.addProduct(title, description, price, thumbnails, code, stock, owener)

            result
            ? res.status(200).send({ status: "A product has been created successfully", payload: result })
            : res.status(404).send({ status:"Error", error: "Something went wrong" })
        } catch(error){
            next(error)
            logger.error(error)
        }
    }

    updateProduct = async (req, res) => {
        try {
            let {pid} = req.params
            let updateBody = req.body
            const product = await productService.getProduct({_id: pid})

            if(!product) return res.status(404).send({status:"Error", message:"The product does not exist"})

            const updateProduct = async(pid, updateBody) => {
                await productService.updateProduct(pid,updateBody)
                res.status(200).send({ 
                    status: "Updated product", 
                    message: `The product was updated ${product.title}` 
                })
            }

            if(req.user.role == "premium"){
                req.user.email !== product.owener
                ? res.status(403).send({ 
                    status:"Error",
                    message:"you do not have permission to update this product"
                })
                : updateProduct(pid, updateBody)
            }else { 
                updateProduct(pid, updateBody)               
            }
        } catch (error) {
            logger.error(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            let {pid} = req.params
            let product = await productService.getProduct({_id: pid})

            if(!product) return res.status(404).send({ status:"Error", message:"The product to delete was not found" })

            const removeProduct = async(pid) => {
                await productService.deleteProduct(pid)
                res.status(200).send({ 
                    status: "Removed product", 
                    message: `Product ${product.title} is removed successfully` 
                })
            }

            if(req.user.role == "premium"){
                req.user.email !== product.owener 
                ? res.status(403).send({
                    status:"Error",
                    message:"You do not have permission to remove this product"
                })
                : removeProduct(pid) 
            }else {
                removeProduct(pid) && await transport.sendMail({
                    from: objectConfig.gmailUser,
                    to: product.owener ,
                    subject: "Removed product",
                    html:`<div>
                                <h1>
                                    Hi user, your product was removed by the admin
                                </h1>
                          </div>`
                })
            }            
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ProductController