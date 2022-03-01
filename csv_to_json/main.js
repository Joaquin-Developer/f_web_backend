const utils = require("./utils")

const csvToJson = ()=> {
    const path = "data/tour_in_excel.csv"
    const data = utils.readFile(path).split("\n")
    const keys = data[0].split(";").map(elem => elem.toLowerCase().replace(" ", "_"))
    data.shift()
    data.pop()

    const jsonData = new Array()

    for (const elem of data) {
        let items = elem.split(";")
        let jsonElement = {}
        for (let i = 0; i < keys.length; i++)
            jsonElement[keys[i]] = items[i]
        
        jsonData.push(jsonElement)
    }

    utils.writeFile(JSON.stringify(jsonData))

}

const readFile = utils.readFile
const writeFile = utils.writeFile

module.exports = { csvToJson, readFile, writeFile }
