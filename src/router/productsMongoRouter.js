const { Router } = require("express")
const passportCall = require("../passportJwt/passportCall.js")
const { authorization } = require("../passportJwt/authorization.js")
const ProductController = require("../controllers/productsController.js")

const router = Router()
const prodController = new ProductController()

//Vista de los productos
router.get("/", passportCall("jwt"), prodController.getProductsAll)

router.get("/:pid", passportCall("jwt"), prodController.getProduct)

router.post("/", passportCall("jwt"), authorization("admin"), prodController.createProduct)

router.put("/:pid", passportCall("jwt"), authorization("admin"), prodController.updateProduct)

router.delete("/:pid", passportCall("jwt"), authorization("admin"), prodController.deleteProduct)

module.exports = router