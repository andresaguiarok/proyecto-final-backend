const { Router }         = require("express")
const passport           = require("passport")
const {passportCall, 
    passportCallUrl}     = require("../passportJwt/passportCall.js")
const { authorization }  = require("../passportJwt/authorization.js")
const SessionController  = require("../controllers/sessionController.js")

const router             = Router()
const sessionControler   = new SessionController()

router.post("/register", sessionControler.register)

router.post("/login", sessionControler.login)

router.post("/recover-password", sessionControler.recoverPassword)

router.post("/change-of-password", passportCallUrl("urlJwt"), sessionControler.changePassword)

router.get("/current", passportCall("jwt"), authorization("user"), sessionControler.infoCurrent)

router.get("/privada", passport.authenticate("jwt",{session:false}), sessionControler.privada)

router.get("/github", passport.authenticate("github", {scope:["user:email"]}), sessionControler.gitHub)

router.get("/githubcall",passport.authenticate("github", {failureRedirect:"/login"}), sessionControler.gitHubCall)

router.get("/logout", passport.authenticate("jwt",{session:false}), sessionControler.logout)

module.exports = router