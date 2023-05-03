const { Router } = require("express")
const ProductManager  = require('../dao/fileSystem/productManager.js');

const consulta = async() => {
    const pm = new ProductManager()
    const router = Router()

    router.get("/", async (req, res) => {
        let productos = await pm.readProducts()
        const limit = req.query.limit

        limit
        ? res.send(productos.slice(0,limit)) 
        :res.send(productos)
    });

    router.get("/:pid", async(req,res) =>{
        let {pid} = req.params
        let producto = await pm.getProductById(pid)
        if (!producto){ return res.status(404).send({status: "error", mensaje: "Este Producto no existe"})}
        res.send(producto)
    });

    router.post("/", async(req, res) => {
        let busquedaDeCode = await pm.readProducts()
        let producto = req.body
        await pm.addProduct(producto)
        
        if(!producto.title || !producto.description || !producto.price || 
           !producto.thumbnails || !producto.code || !producto.stock) {
            return res.status(400).send({status: "error", mensaje: "Completa todos los campos"})
        }

        let codeExiste = busquedaDeCode.find(auto => auto.code === producto.code)
        if (codeExiste) return res.status(400).send({status: "error", mensaje: "Code ingresado anteriormente"})

        res.status(200).send({producto})
    })

    router.put("/:pid", async(req, res) => {
        let {pid} = req.params
        let producto = req.body
        let productoActualizado = await pm.updateProduct(pid,producto)
        res.status(200).send({status:"Exito", mensaje:"Producto Actualizado",productoActualizado})
    })

    router.delete("/:pid", async(req , res) => {
        let {pid} = req.params
        let productoBorrado = await pm.deleteProduct(pid)
        
        res.status(200).send(productoBorrado)
    })
    
    module.exports = router
}

consulta()
