const express = require("express");
const app = express();
const productsRouter = require("./router/productsRouter.js")
const cartsRouter = require("./router/cartRouter.js")

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Esta corriendo en el puerto ${PORT}`);
})






