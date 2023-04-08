const express = require("express");
const ProductManager  = require('./productManager');
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const consulta = async() => {
    const pm = new ProductManager()

    app.get("/products", async (req, res) => {
        let productos = await pm.readProducts()
        const limit = req.query.limit

        limit
        ? res.send(productos.slice(0,limit)) 
        :res.send(productos)
    });

    app.get("/products/:pid", async(req,res) =>{
        let {pid} = req.params
        let producto = await pm.getProductById(pid)
        if (!producto){ return res.status(404).send({status: "error", mensaje: "Este Producto no existe"})}
        res.send(producto)
    });

    app.post("/products", async(req, res) => {
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

    app.put("./products/:pid", (req, res) => {

    })

    app.delete("/products/:pid", async(req , res) => {
        let {pid} = req.params
        let productoBorrado = await pm.deleteProduct(pid)
        
        res.status(200).send(productoBorrado)
    })

    const PORT = 8080

    app.listen(PORT, () => {
        console.log(`Esta corriendo en el puerto ${PORT}`);
    })
}

consulta()




