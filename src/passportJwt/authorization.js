const authorization = role => {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).send({status: "error", message:"Unauthorized"})
        if(req.user.role !== role){
            return res.status(403).send({
                status:"Error",
                message:`You don't have permission because you are ${req.user.role}`
            })
        }
        next()
    }
}

module.exports = {
    authorization
}