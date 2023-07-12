const { Router }    = require("express")
const compression   = require("express-compression")
const { faker }     = require("@faker-js/faker")
const router        = Router()

router.use(compression({
    brotli : {
        enabled: true,
        zlib: {}
    }
}))

router.get("/mockingproducts", (req,res) => {
    let products = []
    let product = {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(), 
        price: faker.commerce.price(),
        thumbnails: faker.image.url(),
        stock: faker.number.int(100),
        code: faker.finance.bitcoinAddress()
    }
    for (let i = 0; i < 52; i++) {
        products.push(product)
    }
    res.send({status:"success", totalProducts: products.length , products: products})
})

router.get("/string", (req,res) => {
    let string = "Hola coder, bienvenido al mundo del codigo"
    for (let i = 0; i < 5e4; i++) {
        string += "Hola coder, bienvenido al mundo del codigo"
    }
    res.send(string)
})

module.exports = router