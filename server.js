const express = require("express");
const ProductManager  = require('./productManager');
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json())

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
        let pid = Number(req.params.pid)
        let producto = await pm.getProductById(pid)
        if (!producto) return 
        res.send(producto)
    });

    app.post("/products", (req, res) => {
        let producto = req.body
    })

    app.put("./products/:pid", (req, res) => {

    })

    app.delete(".products/:pid", (req , res) => {
        
    })

    app.listen(8080, () => {
        console.log("Esta corriendo en el puerto 8080");
    })
}

consulta()




