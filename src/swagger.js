const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "F-WEB API",
      version: "3.0.0",
    //   description: "",
      contact: {
        name: "Joaquin P",
        email: "joaquin.p.olivera@gmail.com",
        url: "https://github.com/Joaquin-Developer"
      },
    },
  },
  apis: ["./src/routes/apiv3.routes.js"],
}

const swaggerSpec = swaggerJSDoc(options)

const setupSwagger = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = setupSwagger
