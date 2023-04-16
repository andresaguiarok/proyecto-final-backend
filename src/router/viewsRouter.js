const { Router } = require ("express")

const consulta = async()=>  {
    const router = Router()

    router.get("/", (req, res)=>{
        res.render("home", {})
    })

    module.exports = router
}

consulta()

