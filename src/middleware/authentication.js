function authentication (req, res, next) {
    if(req.session?.user === "andy" && req.session?.admin){
        return next()    
    }
    return res.status(401).send("error de auntentificacion")
}

module.exports = authentication