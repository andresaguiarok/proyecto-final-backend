const ProductManager = require("../dao/fileSystem/productManager.js")
const messageModel = require("../dao/models/messageModel.js")
let messages = []

const socketProducts = (io) => {
    io.on("connection", async socket =>{
        console.log("Nuevo cliente")
        //Managers
        const pm = new ProductManager()
        const products = await pm.getProducts()

        //socket products
        socket.on("addProduct", async (data, pid)=>{
            await pm.addProduct(data)
        })
        socket.emit("products", products)
        

        //socket chat
        socket.on("message", data => {
            messageModel.create(data)
            messages.push(data)
            io.emit("messageLogs",messages)
        }) 

        socket.on("autentification", data => {
            socket.broadcast.emit("newUserConect", data)
        })
    })
}

module.exports = {socketProducts}