const { Router } = require("express")
const CartController = require("../controllers/cartsController")

const router = Router()
const cartController = new CartController()

router.get("/" , cartController.getCarts)

router.get("/:cid" , cartController.getCart)

router.post("/" , cartController.createCart)

router.put("/:cid/products/:pid" , cartController.addProduct)

router.delete("/:cid/product/:pid" , cartController.deleteProductInCart)

router.delete("/:cid", cartController.deleteProductsInCart)

module.exports = router