const fs = require("fs")

const readFile = (path) => {
    try {
        const data = fs.readFileSync(path, "utf8")
        return data

    } catch (err) { console.error(err) }
}

const writeFile = (data) => {
    fs.writeFile('data/tour_in_json.json', data, err => {
        if (err) {
          console.error(err)
          return
        }
        console.log("Archivo escrito con exito")
    })
}

module.exports = { readFile, writeFile }
