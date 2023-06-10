const { connect } = require("mongoose")

let url = "mongodb+srv://andresaguiarok:andres-2408@cluster0.wbacuba.mongodb.net/ecommerceBackend?retryWrites=true&w=majority"

module.exports = {
    JwtKeySecret: "c0d3rp0w3rT0ken",
    connectDB: ()=> {
        connect(url)
        console.log("Base de datos conectada")
    }
}
