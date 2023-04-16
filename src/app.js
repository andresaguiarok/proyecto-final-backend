const express = require("express");
const app = express();
const productsRouter = require("./router/productsRouter.js")
const cartsRouter = require("./router/cartRouter.js")
const handlebars = require("express-handlebars")

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname+"/public"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")

app.get("/vista", (req, res)=>{
    let user = {
        "name": "pelele",
        style: "index.css"
    }
    res.render("index", user)
})

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Esta corriendo en el puerto ${PORT}`);
})






