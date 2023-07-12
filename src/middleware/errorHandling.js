const { typeErrors } = require("../customErrors/typeErrors");

const errorHandling = (error, req, res, next) => {
    console.log("bug type:",error.code);
    console.log(error.cause);
    switch (error.code) {
        case typeErrors.ROUTING_ERROR:
            return res.send({status: "Error", error: error.name, message: error.message})

        case typeErrors.INVALID_TYPE_ERROR:
            return res.status(404).send({status: "Error", error: error.name, message: error.message})

        case typeErrors.DATABASE_ERROR:
            return res.send({status: "Error", error: error.name, message: error.message})

        default:
            return res.send({status: "Error", error: "Unhandbled error"})          
    }
}

module.exports = {
    errorHandling
}