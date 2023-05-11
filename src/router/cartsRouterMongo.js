const { Router } = require("express")
const cartsManagerMongo = require("../dao/mongoDb/cartManagerMongo.js")

const router = Router()
const cm = new cartsManagerMongo()

router.get("/" , async(req,res) => {
    try {
        const carts = await cm.getCarts()

        res.status(200).send({
            status: "success",
            payload : carts
        })
        
    } catch (error) {
        console.log(error);
    }
})

router.get("/:cid" , async(req,res) => {
    try {

        let {cid} = req.params
        let cart = await cm.getCartByID(cid)

        !cart 
        ? res.status(404).send({
            status:"error",
            message:"No se encontro el carrito"
        })
        : res.status(200).send({
            status: "success",
            payload : cart
        })
        
    } catch (error) {
        console.log(error);
    }
})

router.post("/" , async(req,res) => {
    try {
        const result = await cm.createCart()
        
        res.status(200).send({
            status: "success",
            payload : result
        })
    } catch (error) {
        console.log(error);
    }
})

router.post("/:cid" , async(req, res) => {
    try {
        let {cid} = req.params
        let cartUpdate = await cm.addProduct(cid)

        res.status(200).send({
            status: "success",
            payload: cartUpdate
        })
        
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:cid" , async(req,res)=> {
    try {
        let {cid} = req.params
        let cart = await cm.deleteCart(cid)

        res.status(200).send({
            status: "success",
            payload: cart
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router