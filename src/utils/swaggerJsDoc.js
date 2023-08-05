const swaggerJsDoc           = require("swagger-jsdoc")

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Api Documents",
            description: "Documentation of the following api's"
        }
    },
    apis: [`${__dirname}/docs/**/*.yml `]
}

exports.spect = swaggerJsDoc(swaggerOptions)