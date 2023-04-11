const { Router } = require("express")
const CartManager = require("../managers/cartManager.js");
const ProductManager = require ("../managers/productManager.js")


const consulta = async() =>{
    const cm = new CartManager()
    const pm = new ProductManager()
    const router = Router()

    router.post("/" , async(req, res) => {
        let cart = await cm.newCart()
        res.status(200).send({mensaje:"Se creo el carrito con exito",cart})
    })

    router.get("/:cdi", async (req, res) => {
        let {cdi} = req.params
        let cart = await cm.cartById(cdi)
        if(!cart) return res.status(404).send({error: "error", mensaje : "No existe"})
        res.send(cart)
    })

    router.post("/:cid/product/:pid", async (req, res) =>{
        let {cdi} = req.params
        let cart = await cm.cartById(cdi)

        let {pid} = req.params
        let producto = await pm.getProductById(pid)

        let productoAgregado = await cm.addProductCart(cart,producto)
        res.send({productoAgregado})
        
    })

    
    module.exports= router
}

consulta()