const {Router} = require("express")
const { UserController } = require("../controllers/userController.js")
const passportCall = require("../passportJwt/passportCall")
const { authorization } = require("../passportJwt/authorization")
const router = Router()
const userController = new UserController()

router.get("/", passportCall("jwt"), authorization("admin"),userController.getAllUsers)

router.get("/:uid", passportCall("jwt"),userController.getById)

router.put("/:uid", passportCall("jwt"),userController.updateOldUser)

router.delete("/:uid", passportCall("jwt"),userController.deleteByUser)

module.exports = router
