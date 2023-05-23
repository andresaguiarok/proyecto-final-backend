const express = require("express");
const handlebars = require("express-handlebars")
const { Server } = require("socket.io")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const mongoStore = require("connect-mongo")
const app = express()

const { socketProducts } = require("./utils/socketProducts.js")
const DataBase = require("./config/objetConfig.js")

const productsRouter = require("./router/productsRouter.js")
const cartsRouter = require("./router/cartRouter.js")
const viewRouter = require("./router/viewsRouter.js")
const userRouter = require("./router/userRouter.js")
const productMongoRouter = require("./router/productsMongoRouter.js")
const cartsRouterMongo = require("./router/cartsRouterMongo.js")
const cookiesPruebas = require("./router/cookies.js")
const sessionRouter = require("./router/sessionRouter.js")

// config de app
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/static", express.static(__dirname+"/public"))

//configuracion de Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")

// middleware
app.use(cookieParser("p@l@Br@s3cr3t0"))

app.use(session({
    store: mongoStore.create({
        mongoUrl: "mongodb+srv://andresaguiarok:andres-2408@cluster0.wbacuba.mongodb.net/ecommerceBackend?retryWrites=true&w=majority",
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 10000*60
    }),
    secret : "s3cr3t0c0d3",
    resave: false,
    saveUninitialized: false
}))

//rutas
app.use("/api/products", productsRouter) //Con FileSystem
app.use("/api/carts", cartsRouter) //Con FileSystem
app.use("/", viewRouter) //Vistas
app.use("/api/users", userRouter) //Con Mongo
app.use("/api/productos", productMongoRouter) //Con Mongo 
app.use("/api/carrito", cartsRouterMongo) //Con Mongo
// app.use("/cookies", cookiesPruebas)
app.use("/api/session", sessionRouter)


DataBase.connectDB()

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Esta corriendo en el puerto ${PORT}`);
})

const socketServer = new Server(httpServer)
socketProducts(socketServer)

