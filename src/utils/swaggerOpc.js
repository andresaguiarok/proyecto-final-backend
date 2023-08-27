const path = require("node:path")

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Api Documents",
            description: "Documentation of the following api's"
        }
    },
    apis:[`${path.dirname(__dirname)}/docs/**/*.yml`]
}

module.exports = {
    swaggerOptions
}