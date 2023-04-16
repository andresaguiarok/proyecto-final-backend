const express = require("express");
const app = express();
const productsRouter = require("./router/productsRouter.js")
const cartsRouter = require("./router/cartRouter.js")
const viewRouter = require("./router/viewsRouter.js")
const handlebars = require("express-handlebars")
const { Server } = require("socket.io")

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/static", express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewRouter)

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Esta corriendo en el puerto ${PORT}`);
})

const socketServer = new Server(httpServer)

socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado")

    socket.on("message", data => {
        console.log(data);
    })

    socket.emit("socket-individual", "Este mensaje lo recive el socket del cliente")

    socket.broadcast.emit("event-p-todos-menos-el-socket-actual", "Evento que veran los sockets menos el actual")

    socketServer.emit("event-all", "este mensaje lo reciben todos")
})