const jsonWebToken = require("jsonwebtoken")
const JWT_PRIVATE_KEY = "c0d3rp0w3rT0ken"

const generateToken = (user) =>{
    const token = jsonWebToken.sign(user, JWT_PRIVATE_KEY, {expiresIn: "12h"}) 
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