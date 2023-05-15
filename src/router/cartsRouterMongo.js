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
        : res.status(200).render("cartById",{
            cart
        })
        
    } catch (error) {
        console.log(error);
    }
})

router.put("/" , async(req,res) => {
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

router.put("/:cid/products/:pid" , async(req, res) => {
    try {
        let {cid, pid} = req.params
        let prodToCart = await cm.addProduct(cid, pid)
        
        if(!prodToCart){
            res.status(404).send({error:"error", message:"no existe el carrito o el producto"})
        }

        res.status(200).send({
            status: "success",
            payload: prodToCart
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:cid/product/:pid" , async(req,res)=> {
    try {
        let {cid, pid} = req.params
        let cart = await cm.deleteProduct(cid, pid)

        res.status(200).send({
            status: "success",
            message: "Se elimino el producto correctamente",
            payload: cart
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:cid", async(req,res)=>{
    try {
        let {cid} = req.params
        let cart = await cm.deleteAllProd(cid)

        !cart
        ?res.status(404).send({
            status: "error",
            message: "No se encontro el carrito"
        })
        :res.status(200).send({
            status: "success",
            message: "se borro todos los productos",
            payload: cart
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router