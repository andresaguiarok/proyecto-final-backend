function authentication (req, res, next) {
    console.log(req.session);
    if(req.session?.user?.firtsName === "andres" || !req.session?.user?.admin === "admin"){
        return next() 
    }
    return res.render("erro401", {title: "401", style:"error401.css"})
}

module.exports = authentication