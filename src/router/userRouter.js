const {Router} = require("express")
const { UserController } = require("../controllers/userController.js")
const router = Router()
const userController = new UserController()

router.get("/", userController.getAllUsers)

router.get("/:uid", userController.getById)

router.put("/:uid", userController.updateOldUser)

router.delete("/:uid", userController.deleteByUser)

module.exports = router
