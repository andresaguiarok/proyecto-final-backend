const { Router } = require("express")
const CartManager = require("../dao/fileSystem/cartManager.js");

const consulta = async() =>{
    const cm = new CartManager()
    const router = Router()

    router.post("/" , async(req, res) => {
        let cart = await cm.newCart()
        res.status(200).send({mensaje:"Se creo el carrito con exito",cart})
    })

    router.get("/:cdi", async (req, res) => {
        let {cdi} = req.params
        let cart = await cm.cartById(cdi)
        if(!cart) return res.status(404).send({status: "error", mensaje : "No existe"})
        res.send(cart)
    })

    router.post("/:cid/product/:pid", async (req, res) =>{
        let {cid} = req.params
        let {pid} = req.params
        let cartProd = await cm.addProductCart(cid,pid)
        res.status(200).send({mensaje:"Se agrego al carrito",cartProd})
    })

    
    module.exports = router
}

consulta()