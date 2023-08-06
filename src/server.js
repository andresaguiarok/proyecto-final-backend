const express                = require("express")
const handlebars             = require("express-handlebars")
const cookieParser           = require("cookie-parser")
const session                = require("express-session")
const mongoStore             = require("connect-mongo")
const passport               = require("passport")
const cors                   = require("cors")
const { Server: ServerHTTP}  = require("http")
const { Server: ServerIO }   = require("socket.io")
const compression            = require("express-compression")

const initPassport           = require("./passportJwt/passportJwt.js")
const { socketProducts }     = require("./utils/socketProducts.js")
const { initPassportGithub } = require("./config/passportConfig.js")
const { errorHandling }      = require("./middleware/errorHandling.js")
const { addLogger, logger }  = require("./utils/logger.js")
const swaggerUiExpress       = require("swagger-ui-express")
const swaggerJsDoc           = require("swagger-jsdoc")
require("dotenv")

const viewRouter             = require("./router/viewsRouter.js")
const userRouter             = require("./router/userRouter.js")
const sessionRouter          = require("./router/sessionRouter.js")
const productsRouter         = require("./router/productsRouter.js")
const cartsRouter            = require("./router/cartsRouter.js")
const ticketRouter           = require("./router/ticketRouter.js")
const mockingRouter          = require("./router/mockingRouter.js")
const myProfileRouter        = require("./router/myProfileRouter.js")

const app                    = express()
const serverHttp             = new ServerHTTP(app)
const socketServer           = new ServerIO(serverHttp)
const PORT                   = process.env.PORT

// config de app
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/static", express.static(__dirname+"/public"))
app.use(cors())
app.use(compression({
    brotli : {
        enabled: true,
        zlib: {}
    }
}))

//configuracion de Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")

// middleware
app.use(cookieParser("p@l@Br@s3cr3t0"))
app.use(session({
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_KEY_SECRET,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }, ttl:60*60*1000
    }),
    secret : "s3cr3t0c0d3", resave: false, saveUninitialized: false
}))
app.use(addLogger)

//passport
initPassport()
initPassportGithub()
passport.use(passport.initialize())
passport.use(passport.session())

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Api Documents",
            description: "Documentation of the following api's"
        }
    },
    apis:[`${__dirname}/docs/**/*.yml`]
}

const specs                  = swaggerJsDoc(swaggerOptions)

//rutas
app.use("/",                 viewRouter)
app.use("/api/users",        userRouter)
app.use("/api/session",      sessionRouter)
app.use("/api/products",     productsRouter)
app.use("/api/carts",        cartsRouter)
app.use("/api/tickets",      ticketRouter)
app.use("/mocking",          mockingRouter)
app.use("/myProfile",        myProfileRouter)
app.use("/docs",             swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(errorHandling)

exports.startServer = () => serverHttp.listen(PORT, () => {
    logger.info(`Running in the port: ${PORT}`) 
})




// socketProducts(socketServer)
