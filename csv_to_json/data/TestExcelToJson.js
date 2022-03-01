const XLSX = require("xlsx")

const getDateInLocalLanguage = (date) => {
    if (!date.includes(":")) {
        date += " 00:00"
    }
    date = new Date(date)

    return date.toLocaleString("es-UY", {
        day: 'numeric', month: 'long', year: 'numeric'
    })
}


function excelToJson(path = "tour_in_excel.ods") {

    let excel = XLSX.readFile(path)
    let sheetName = excel.SheetNames[0]
    const data = XLSX.utils.sheet_to_json(excel.Sheets[sheetName])

    for (const elem of data) {
        let dt = new Date((elem["API DATE"] - (25567 + 1)) * 86400 * 1000)
        dt.setHours(0)
        dt.setMinutes(0)
        dt.setSeconds(0)

        let stringDt = dt.toLocaleDateString("en-US").replaceAll("/", "-")

        console.log(elem)
        console.log("dt: ", dt)
        console.log("str dt: ", stringDt)
        console.log("local lang: ", getDateInLocalLanguage(stringDt))
    }

}

excelToJson()
