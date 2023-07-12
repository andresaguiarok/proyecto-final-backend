const { Router } = require("express")
const compression = require("express-compression")
const router = Router()


// router.use(compression({
//     brotli : {
//         enabled: true,
//         zlib: {}
//     }
// }))

router.get("/", (req,res) => {
    let string = "Hola coder, bienvenido al mundo del codigo"
    for (let i = 0; i < 5e4; i++) {
        string += "Hola coder, bienvenido al mundo del codigo"
    }
    res.send(string)
})

module.exports = router