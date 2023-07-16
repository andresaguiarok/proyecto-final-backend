const ProductDao    = require("../daos/fileSystem/productDaoFs.js")
const messageModel  = require("../daos/models/messageModel.js")
let messages = []

const socketProducts = (io) => {
    io.on("connection", async socket =>{
        console.log("Nuevo cliente")
        //Managers
        const pm = new ProductDao()
        const products = await pm.get()

        //socket products
        socket.on("addProduct", async (data, pid)=>{
            await pm.create(data)
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