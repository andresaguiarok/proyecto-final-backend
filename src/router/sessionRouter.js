const { Router } = require("express")
const passport = require("passport")
const { generateToken } = require("../utils/jsonWebToken.js")
const passportCall = require("../passportJwt/passportCall.js")
const { authorization } = require("../passportJwt/authorization.js")
const SessionController = require("../controllers/sessionController.js")
const sessionControler = new SessionController()

const router = Router()
// Con userManager
router.post("/register", sessionControler.register)

//Login con userManager
router.post("/login", sessionControler.login)

router.get("/current", passportCall("jwt"), authorization("user"), sessionControler.infoCurrent)

router.get("/privada", passport.authenticate("jwt",{session:false}), sessionControler.privada)

router.get("/github", passport.authenticate("github", {scope:["user:email"]}), sessionControler.gitHub)

router.get("/githubcall",passport.authenticate("github", {failureRedirect:"/login"}), sessionControler.gitHubCall)

router.get("/logout", passport.authenticate("jwt",{session:false}), sessionControler.logout)


module.exports = router