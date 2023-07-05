const { Router } = require("express")
const passportCall = require("../passportJwt/passportCall.js")
const { authorization } = require("../passportJwt/authorization.js")
const CartController = require("../controllers/cartsController")

const router = Router()
const cartController = new CartController()

router.get("/" , passportCall("jwt"), authorization("admin"),cartController.getCarts)

router.get("/:cid" , passportCall("jwt"), cartController.getCart)

router.post("/" , cartController.createCart)

router.put("/:cid/products/:pid" , passportCall("jwt"), authorization("user"), cartController.addProduct)

router.delete("/:cid/product/:pid" , passportCall("jwt"), authorization("user"),cartController.deleteProductInCart)

router.delete("/:cid", cartController.deleteProductsInCart)

module.exports = router