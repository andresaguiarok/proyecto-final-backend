const { Router } = require ("express")
const ViewsController = require("../controllers/viewsController")
const router = Router()
const viewsController = new ViewsController()

router.get("/login", viewsController.loginView)

router.get("/register", viewsController.registerView)

router.get("/realTimeProducts", viewsController.realTimeProductsView)

router.get("/chat", viewsController.chatView)

module.exports = router
