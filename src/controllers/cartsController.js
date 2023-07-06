const TicketManager = require("../dao/mongoDb/ticketManager.js");
const { cartService, productService } = require("../service/services.js")
const { v4:uuidv4 } = require("uuid")
const ticketManager = new TicketManager()

class CartController {

    getCarts = async(req,res) => {
        try {
            const carts = await cartService.getCarts()
    
            res.status(200).send({
                status: "success",
                payload : carts
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    getCart = async(req,res) => {
        try {
            let {cid} = req.params
            let cart = await cartService.getCartByID(cid)
    
            if(!cart) return res.send({status: "Error", message: "Cart not found"})
    
            const cartObj = {
                title: "Cart",
                style: "cart.css",
                id: cart._id,
                products : cart.products
            }
    
            res.render("cartById", cartObj)
            
        } catch (error) {
            console.log(error);
        }
    }

    createCart = async(req,res) => {
        try {
            const result = await cartService.createCart()
            
            result ? res.status(200).send({status: "The cart was created successfully",payload : result})
            : res.status(404).send({status:"Error", message: "There's been a problem"})
            
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async(req, res) => {
        try {
            let {cid, pid} = req.params
            let prodToCart = await cartService.addProduct(cid, pid)
    
            if (!prodToCart){
                res.send({error:"error", message:"Cart not found o product not found"})
            }
            
            res.status(200).send({
                status: "The cart was updated successfully",
                payload: prodToCart
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteProductInCart = async(req,res)=> {
        try {
            let {cid, pid} = req.params
            let cart = await cartService.deleteProduct(cid, pid)
    
            if(!cart){
                res.status(404).send({
                    status: "error",
                    message:"Cart o product not found"
                })
            }
    
            res.status(200).send({
                status: "success",
                message: "cart was deleted successfully",
                payload: cart
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteProductsInCart = async(req,res)=>{
        try {
            let {cid} = req.params
            let cart = await cartService.deleteAllProd(cid)
    
            if(!cart) return res.status(404).send({status: "error", message: "Cart not found"})
            
            res.status(200).send({
                status: "success",
                message: "The cart was emptied successfully",
                payload: cart
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    cartPurchase = async(req,res) => {
        try {
            const {cid} = req.params
            const cart = await cartService.getCartByID(cid)
            const insufficientStock = []
            const buyProducts = []
            
            if(!cart) throw({status:"Error", message:"Cart not found"})
            
            cart.products.forEach(async item => {
                const product = item.product
                const quantity = item.quantity
                const stock = item.product.stock

                quantity > stock 
                ? insufficientStock.push(product) 
                : buyProducts.push({product, quantity}) 
                    && await productService.updateProduct(product, {stock: stock - quantity}) 
                //     && await cartService.deleteProduct(cart, product) 
            });

            const totalPrice = buyProducts.reduce((acc, item) => acc + item.quantity, 0)
            
            if(buyProducts.length > 0){  
                const ticket = await ticketManager.createTicket({
                    code: uuidv4(),
                    amount: totalPrice,
                    purchaser: req.user.email,
                })
                res.send({status:"Success", message:"Successful purchase", toTicket: ticket})
            }
        } catch (error) {
            console.log(error);
            res.status(404).send(error)
        }
    }
}

module.exports = CartController