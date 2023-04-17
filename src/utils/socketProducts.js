const ProductManager = require("../managers/productManager.js")

const socketProducts = (io) => {
    io.on("connection", async socket =>{
        const pm = new ProductManager()
        const products = await pm.getProducts()

        console.log("Nuevo cliente")
        socket.emit("products", products)

        socket.on("addProduct", async data =>{
            console.log(data);
            await pm.addProduct(data)
        })

        
    })
}

module.exports = {socketProducts}