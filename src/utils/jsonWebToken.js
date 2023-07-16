const jsonWebToken = require("jsonwebtoken")
require("dotenv").config()

const JWT_PRIVATE_KEY = process.env.JWT_KEY

const generateToken = (user) =>{
    const token = jsonWebToken.sign(JSON.parse(JSON.stringify(user)), JWT_PRIVATE_KEY, {expiresIn: "1d"}) 
    return token
}

const authToken = (req,res, next) => {
    const authHeader = req.headers["authorization"]

    if(!authHeader) return res.status(401).send({status:"error", message:"Not authenticated"})

    const token = authHeader.split(" ")[1]

    jsonWebToken.verify(token, JWT_PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({status:"error", message:"Not authorized"})
        req.user = credentials.user
        next()
    })
}

module.exports = {
    generateToken,
    authToken
}