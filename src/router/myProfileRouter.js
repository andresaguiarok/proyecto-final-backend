const { Router }         = require("express")
const { userService,
    cartService }        = require("../service/services.js")
const { passportCall }   = require("../passportJwt/passportCall.js")

const router = Router()

router.get("/", passportCall("jwt"), async(req,res) => {
    try {
        const {email} = req.user
        const user = await userService.getUser({email})

        user 
        ? res.status(200).send({status:"success", toInfo: user}) 
        : res.status(404).send({status:"Error", message:"Your information does not exist"})
    } catch (error) {
        console.log(error);
    }
})

router.get("/myCart", passportCall("jwt"), async(req,res) => {
    const {cart} = req.user
    const user = await userService.getUser({cart})
    const myCart = await cartService.getCartByID(user.cart._id)

    myCart ? res.send({status:"Success", toCartIs: myCart}) : res.send({status:"Error", message: "Cart not found"})
})
router.get("/", (req,res) => {})

module.exports = router