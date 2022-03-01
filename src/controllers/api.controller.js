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
                res.status(500) - json({ error: true, message: error.toString() })
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
                res.status(500) - json({ error: true, message: error.toString() })
            })

    }

    static newTourDate(req, res) {
        const { showDate, show, scenary, place } = req.body

        if (!showDate || !show || !scenary || !place) {
            res.status(500).json({ error: true, message: "Missing id param in Body Request" })
            return
        }

        const query = new Query(`
            INSERT INTO TOUR
            VALUES (NULL, ?, ?, ?, ?)
        `)

        query.insert([show, scenary, place, showDate])
            .then(data => {
                console.log(data)
                res.status(200).json({ error: false, message: `Tour: ${show} - saved in database.` })
            })
            .catch(e => {
                res.status(500).json({ error: true, message: e.toString() })
            })
    }

    static updateTourDate(req, res) {
        const { id, showDate, showName, scenary, place } = req.body

        if (!id || !showDate || !showName || !scenary || !place) {
            res.status(500).json({ error: true, message: "Missing id param in Body Request" })
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

}

module.exports = ApiController