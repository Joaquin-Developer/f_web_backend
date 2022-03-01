// const utils = require("../../csv_to_json/main")
const utils = require("../../csv_to_json/utils")
const config = require("../../core/config")

let json_data = undefined

class Tour {

    static getAllTourDates() {
        try {
            if (json_data) {
                return JSON.parse(json_data)
            }
            json_data = utils.readFile(config.PATH_CSV_FILE)
            return JSON.parse(json_data)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

module.exports = Tour



