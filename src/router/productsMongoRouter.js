const { Router } = require("express")
const passport = require("passport")
const ProductController = require("../controllers/productsController.js")
const router = Router()
const prodController = new ProductController()

//Vista de los productos
router.get("/", passport.authenticate("jwt", { session: false }), prodController.getProductsAll)

router.get("/:pid", prodController.getProduct)

router.post("/", prodController.createProduct)

router.put("/:pid", prodController.updateProduct)

router.delete("/:pid", prodController.deleteProduct)

module.exports = router