const utils = require("../../csv_to_json/main")
const config = require("../../core/config")
const Tour = require("../modules/Tour")
const Query = require("../modules/Query")
const { json } = require("express/lib/response")

class ApiController {

    static getTourDates(req, res) {
        try {
            const data = Tour.getAllTourDates()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ "error": JSON.stringify(error) })
        }

    }

    static getAllTourDates(req, res) {
        const query = new Query(`
            SELECT 
                tour_id,
                tour_show,
                scenary,
                place,
                show_date
            FROM TOUR 
            ORDER BY show_date ASC;
        `)

        query.select()
            .then(data => res.status(200).json(JSON.parse(data)))
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: error.toString() })
            })

    }

    static getActualTourDates(req, res) {
        // return tour_dates where date >= today
        const query = new Query(`
            SELECT 
                tour_id,
                tour_show,
                scenary,
                place,
                show_date
            FROM TOUR 
            WHERE show_date >= CURDATE() 
            ORDER BY show_date ASC;
        `)

        query.select()
            .then(data => res.status(200).json(JSON.parse(data)))
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: error.toString() })
            })

    }

    static getCurrentMonthTourDates(req, res) {
        const query = new Query(`
            SELECT 
                tour_id,
                tour_show,
                scenary,
                place,
                show_date
            FROM TOUR 
            WHERE DATE_FORMAT(show_date, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
            ORDER BY show_date ASC;
        `)

        query.select()
            .then(data => res.status(200).json(JSON.parse(data)))
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: error.toString() })
            })
    }

    static newTourDate(req, res) {
        const { showDate, showName, scenary, place } = req.body

        if (!showDate || !showName || !scenary || !place) {
            res.status(500).json({ error: true, message: "Missing id param in Body Request" })
            return
        }

        const query = new Query(`
            INSERT INTO TOUR
            VALUES (NULL, ?, ?, ?, ?)
        `)

        query.insert([showName, scenary, place, showDate])
            .then(data => {
                console.log(data)
                res.status(200).json({ error: false, message: `Tour: ${showName} - saved in database.` })
            })
            .catch(e => {
                console.log(e)
                res.status(500).json({ error: true, message: e.toString() })
            })
    }

    static updateTourDate(req, res) {
        const { id, showDate, showName, scenary, place } = req.body

        if (!id || !showDate || !showName || !scenary || !place) {
            res.status(500).json({ error: true, message: "Missing params in Body Request" })
            return
        }

        Query.update(showName, scenary, place, showDate, id)
            .then(data => {
                console.log(data)
                res.status(200).json({ error: false, message: `Tour: ${showName} - UPDATED in database.` })
            })
            .catch(e => {
                res.status(500).json({ error: true, message: e.toString() })
            })
    }

    static deleteTourDate(req, res) {
        const { idTourDate } = req.body

        if (!idTourDate) {
            res.status(500).json({ error: true, message: "Missing id param in Body Request" })
            return
        }

        Query.deleteTourDate(idTourDate)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(error => {
                res.status(200).json({ error: true, message: `INTERNAL_ERROR - Tour id ${idTourDate} not deleted` })
            })
    }

    static getTourDatesByLocation(req, res) {
        const { city, state, country, countryCode } = req.body

        let countryCond

        if (country) {
            countryCond = `.country = '${country}'`
        } else if (countryCode) {
            countryCond = `.country_code = '${countryCode}'`
        }

        const query = new Query(`
            SELECT 
                t.tour_id,
                t.tour_show,
                t.scenary,
                t.place,
                t.show_date
            FROM
                TOUR t
                JOIN location_data ld on t.location_id = ld.id
            WHERE
                ld.city = '${city}' OR
                (ld.city IS NULL AND ld.state = '${state}' AND
                    EXISTS (
                        SELECT 1
                        FROM location_data ld_state
                        WHERE ld_state.state = 'state'
                        AND ld_state.id = t.location_id
                    )
                ) OR
                (ld.city IS NULL AND ld.state IS NULL AND ld.${countryCond} AND
                    EXISTS (
                        SELECT 1
                        FROM location_data ld_country
                        WHERE ld_country.${countryCond}
                        AND ld_country.id = t.location_id
                    )
                )
        `)

        query.select()
            .then(data => res.status(200).json(JSON.parse(data)))
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: error.toString() })
            })

    }
}

module.exports = ApiController