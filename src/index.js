const app = require("./app.js")

const main = () => {
    app.listen(app.get("port"), () => {
        console.log("Server running on port", app.get("port"));
    })
}

// run the server:
main()