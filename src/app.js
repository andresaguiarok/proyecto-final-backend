const express                = require("express");
const handlebars             = require("express-handlebars")
const cookieParser           = require("cookie-parser")
const session                = require("express-session")
const mongoStore             = require("connect-mongo")
const passport               = require("passport")
const cors                   = require("cors")
const { Server }             = require("socket.io")

const initPassport           = require("./passportJwt/passportJwt.js");
const { socketProducts }     = require("./utils/socketProducts.js")
const { initPassportGithub } = require("./config/passportConfig.js");
const { errorHandling }      = require("./middleware/errorHandling.js");
const app                    = express()
require("dotenv")

const cartsRouter            = require("./router/cartsRouter.js")
const viewRouter             = require("./router/viewsRouter.js")
const userRouter             = require("./router/userRouter.js")
const productMongoRouter     = require("./router/productsMongoRouter.js")
const sessionRouter          = require("./router/sessionRouter.js");
const ticketRouter           = require("./router/ticketRouter.js")
const mockingRouter          = require("./router/mockingRouter.js");

// config de app
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/static", express.static(__dirname+"/public"))
app.use(cors())

//configuracion de Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")

// middleware
app.use(cookieParser("p@l@Br@s3cr3t0"))
app.use(session({
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_KEY_SECRET,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }, ttl: 10000*60
    }),
    secret : "s3cr3t0c0d3", resave: false, saveUninitialized: false
}))

//passport
initPassport()
initPassportGithub()
passport.use(passport.initialize())
passport.use(passport.session())

//rutas
app.use("/api/carts",     cartsRouter)
app.use("/",              viewRouter) //Vistas
app.use("/api/users",     userRouter) //Con Mongo
app.use("/api/productos", productMongoRouter) //Con Mongo 
app.use("/api/session",   sessionRouter)
app.use("/api/tickets",   ticketRouter)
app.use("/mocking",       mockingRouter)
app.use(errorHandling)

const PORT                = process.env.PORT
const httpServer          = app.listen(PORT, () => {
    console.log(`Running in the port: ${PORT}`)
})

const socketServer        = new Server(httpServer)
socketProducts(socketServer)