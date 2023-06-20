const cartsManagerMongo = require("../dao/mongoDb/cartManagerMongo.js")
const cm = new cartsManagerMongo()

class CartController {

    getCarts = async(req,res) => {
        try {
            const carts = await cm.getCarts()
    
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
            let cart = await cm.getCartByID(cid)
    
            if(!cart) return res.send({status: "error", message: "Cart not found"})
    
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
            const result = await cm.createCart()
            
            res.status(200).send({
                status: "cart created",
                payload : result
            })
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async(req, res) => {
        try {
            let {cid, pid} = req.params
            let prodToCart = await cm.addProduct(cid, pid)
    
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
            let cart = await cm.deleteProduct(cid, pid)
    
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
            let cart = await cm.deleteAllProd(cid)
    
            !cart
            ?res.status(404).send({
                status: "error",
                message: "Cart not found"
            })
            :res.status(200).send({
                status: "success",
                message: "The cart was emptied successfully",
                payload: cart
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartController