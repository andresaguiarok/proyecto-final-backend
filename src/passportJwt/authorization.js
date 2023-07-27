const authorization = roles => {
    return async (req, res, next) => {
        const getRole = roles.find(role => role == req.user.role)
        if(!req.user) return res.status(401).send({status: "error", message:"Unauthorized"})
        if(req.user.role !== getRole){
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