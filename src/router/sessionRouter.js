const { Router } = require("express")
const authentication = require("../middleware/authentication.js")
const { userModel } = require("../dao/models/usersModel.js")
const router = Router()

router.post("/register", async(req,res) => {
    const {firtsName, lastName, userName, email, password} = req.body

    //validacion si vienen los campos vacios
    if(firtsName == "" || lastName == "" || email == "" || password == "" || userName == ""){
        return res.status(404).send({message:"complete los campos que faltan"})
    }
    
    //validar si existe el username o email
    const userEmail = await userModel.findOne({email})
    if(userEmail){
        return res.status(404).send({status:"error", message:"este email ya esta registrado"})
    }
    //validar si existe el userName
    const uName = await userModel.findOne({userName})
    if(uName){
        return res.status(404).send({status:"error", message:"este usuarios ya esta registrado"})
    }

    const newUser = {
        firtsName, lastName, userName, email, password
    }

    await userModel.create(newUser)
    
    res.status(200).send({message:`El usuario ${firtsName} ${lastName} se creo con exito `})
})

router.post("/login", async(req, res) => {
    const {email , password} = req.body

    const userDB = await userModel.findOne({email})
    const userPassword = await userModel.findOne({password})

    // validacion de email && password
    if(!userDB) return res.status(404).send({status:"error", message:"Este mail no existe"})
    if(!userPassword) return res.status(404).send({status:"error", password:"Password invalido"})

    req.session.user = {
        firtsName: userDB.firtsName,
        lastName: userDB.lastName,
        email: userDB.email,
        userName: userDB.userName,
        role: "admin"
    }

    res.redirect("/api/productos")
})

router.get("/privada", authentication, (req,res) => {
    res.send("Podes ver los productos")
})


router.get("/logout", authentication, (req, res) => {
    req.session.destroy( error => {
        if(error){
           return res.send({status: "error", message: error})
        }else {
            res.redirect("/login")
        }
    })
})


module.exports = router