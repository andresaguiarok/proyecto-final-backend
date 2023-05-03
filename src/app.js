const express = require("express");
const app = express();

const productsRouter = require("./router/productsRouter.js")
const cartsRouter = require("./router/cartRouter.js")
const viewRouter = require("./router/viewsRouter.js")
const userRouter = require("./router/userRouter.js")
const productMongoRouter = require("./router/productsMongoRouter.js")

const handlebars = require("express-handlebars")
const { Server } = require("socket.io")
const { socketProducts } = require("./utils/socketProducts.js")
const objetConfig = require("./config/objetConfig.js")

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/static", express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewRouter)
app.use("/api/users", userRouter)
app.use("/api/productos", productMongoRouter)

objetConfig.connectDB()

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Esta corriendo en el puerto ${PORT}`);
})

const socketServer = new Server(httpServer)
socketProducts(socketServer)

