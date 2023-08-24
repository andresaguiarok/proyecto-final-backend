const {Router}           = require("express")
const { UserController } = require("../controllers/userController.js")
const { passportCall }   = require("../passportJwt/passportCall")
const { authorization }  = require("../passportJwt/authorization")
const { uploader }       = require("../utils/multer.js")

const router             = Router()
const userController     = new UserController()

router.get("/", passportCall("jwt"), authorization(["admin"]), userController.getAllUsers)

router.get("/:uid", passportCall("jwt"), authorization(["admin"]), userController.getById)

router.post("/:uid/documents", passportCall("jwt"), authorization(["user", "premium"]), uploader.any(), userController.uploadDocuments)

router.put("/:uid", passportCall("jwt"), authorization(["user", "premium", "admin"]), userController.updateOldUser)

router.put("/premium/:uid", passportCall("jwt"), authorization(["user", "premium"]), userController.changeOfRole)

router.delete("/:uid", passportCall("jwt"), authorization(["admin"]), userController.deleteByUser)

module.exports = router
