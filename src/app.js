const express = require("express")
const cors = require("cors")

const app = express()

// settings:
app.set("port", process.env.PORT || 5016)
app.use(cors({})) /* config */
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // read html forms

// routes:
// app.use("/api/v1/", require("./routes/apiv1.routes"))
app.use("/api/v2/", require("./routes/apiv2.routes"))

// 404 not found requests:
app.use((request, response, next) => {
    response.status(404).send("404 not found")
});

module.exports = app
