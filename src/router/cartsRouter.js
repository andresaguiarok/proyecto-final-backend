const { Router }         = require("express")
const { passportCall }   = require("../passportJwt/passportCall.js")
const { authorization }  = require("../passportJwt/authorization.js")
const CartController     = require("../controllers/cartsController")

const router             = Router()
const cartController     = new CartController()

router.get("/" , passportCall("jwt"), authorization(["admin"]), cartController.getCarts)

router.get("/:cid" , passportCall("jwt"), cartController.getCart)

router.post("/" , passportCall("jwt"), authorization(["admin"]), cartController.createCart)

router.put("/:cid/products/:pid" , passportCall("jwt"), authorization(["user", "premium"]), cartController.addProduct)

router.delete("/:cid/products/:pid" , passportCall("jwt"), authorization(["user", "premium"]), cartController.deleteProductInCart)

router.post("/:cid/purchase", passportCall("jwt"), authorization(["user", "premium"]), cartController.cartPurchase)

router.delete("/:cid", passportCall("jwt"), authorization(["user", "premium"]), cartController.deleteProductsInCart)

module.exports = router