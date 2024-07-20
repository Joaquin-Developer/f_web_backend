const Query = require("../modules/Query")


class ApiController {
    static getAllShowDates(req, res) {
        const query = new Query(`
            SELECT
                t.tour_id,
                s.show_id,
                t.tour_name as tour_show,
                s.scenary,
                c.city_name,
                st.state_name,
                ct.country_name,
                ct.country_short_name,
                s.show_date
            FROM
                shows s
                JOIN tours t on s.tour_id = t.tour_id
                JOIN cities c on s.city_id = c.city_id
                JOIN states st on c.state_id = st.state_id
                JOIN countries ct on st.country_id = ct.country_id
            ORDER BY
                s.show_date ASC;
        `)

        query.select()
            .then(data => res.status(200).json(JSON.parse(data)))
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: error.toString() })
            })

    }

    // return tour_dates where date >= today
    static getActualShowDates(req, res) {
        const query = new Query(`
            SELECT
                t.tour_id,
                s.show_id,
                t.tour_name as tour_show,
                s.scenary,
                c.city_name,
                st.state_name,
                ct.country_name,
                ct.country_short_name,
                s.show_date
            FROM
                shows s
                JOIN tours t on s.tour_id = t.tour_id
                JOIN cities c on s.city_id = c.city_id
                JOIN states st on c.state_id = st.state_id
                JOIN countries ct on st.country_id = ct.country_id
            WHERE
                s.show_date >= CURDATE()
            ORDER BY
                s.show_date ASC;
        `)

        query.select()
            .then(data => res.status(200).json(JSON.parse(data)))
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: error.toString() })
            })

    }

    static getCurrentMonthShowDates(req, res) {
        const query = new Query(`
            SELECT
                t.tour_id,
                s.show_id,
                t.tour_name as tour_show,
                s.scenary,
                c.city_name,
                st.state_name,
                ct.country_name,
                ct.country_short_name,
                s.show_date
            FROM
                shows s
                JOIN tours t on s.tour_id = t.tour_id
                JOIN cities c on s.city_id = c.city_id
                JOIN states st on c.state_id = st.state_id
                JOIN countries ct on st.country_id = ct.country_id
            WHERE
                DATE_FORMAT(show_date, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
            ORDER BY
                s.show_date ASC;
        `)

        query.select()
            .then(data => res.status(200).json(JSON.parse(data)))
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: true, message: error.toString() })
            })
    }

    static newShowDate(req, res) {
        const { tourId, cityId, showDate, scenary } = req.body

        if (!tourId || !cityId || !showDate || !scenary) {
            res.status(500).json({ error: true, message: "Missing params in Body Request" })
            return
        }
        const query = new Query(`INSERT INTO shows VALUES (NULL, ?, ?, ?, ?)`)

        query.insert([tourId, cityId, showDate, scenary])
            .then(data => {
                console.log(data)
                res.status(200).json({
                    error: false,
                    message: `Show: ${showDate}, ${tourId}, ${cityId}, ${scenary} - saved in database.` 
                })
            })
            .catch(e => {
                console.log(e)
                res.status(500).json({ error: true, message: e.toString() })
            })
    }

    static updateShowDate(req, res) {

    }

    static deleteShowDate(req, res) {

    }

    static getAllTours(req, res) {
        new Query("SELECT tour_id, tour_name FROM tours").select()
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: true, message: error.toString() })
        })
    }

    static newTour(req, res) {
        const { tourName } = req.body

        if (!tourName) {
            res.status(500).json({ error: true, message: "Missing tourName param in Body Request" })
            return
        }

        const query = new Query(`INSERT INTO tours VALUES (NULL, ?)`)

        query.insert([tourName])
            .then(data => {
                console.log(data)
                res.status(200).json({ error: false, message: `Tour: ${tourName} - saved in database.` })
            })
            .catch(e => {
                console.log(e)
                res.status(500).json({ error: true, message: e.toString() })
            })
    }

    static updateTour(req, res) {
        const { tourId, tourName } = req.body

        if (!tourId || !tourName) {
            res.status(500).json({ error: true, message: "Missing params in Body Request" })
            return
        }

        new Query(`UPDATE tours SET tour_name = ? WHERE tour_id = ?`).update([tourName, tourId])
            .then(data => {
                console.log(data)
                res.status(200).json({ error: false, message: `Tour: ${tourName} - UPDATED in database.` })
            })
            .catch(e => {
                res.status(500).json({ error: true, message: e.toString() })
            })
    }

    static getAllCountries(req, res) {
        new Query("SELECT country_id, country_name FROM countries").select()
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: true, message: error.toString() })
        })
    }
    
    static getAllStatesByCountry(req, res) {
        const { country } = req.body

        new Query(`
            SELECT DISTINCT st.state_id, st.state_name
            FROM states st
            JOIN countries ct on st.country_id = ct.country_id
            WHERE upper(ct.country_name) = '${country.toUpperCase()}'
        `).select()
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: true, message: error.toString() })
        })
    }

    static getAllCitiesByCountryState(req, res) {
        const { country, state } = req.body

        new Query(`
            SELECT DISTINCT c.city_id, c.city_name
            FROM cities c
            JOIN states st on c.state_id = st.state_id
            JOIN countries ct on st.country_id = ct.country_id
            WHERE
                upper(ct.country_name) = '${country.toUpperCase()}'
                and upper(st.state_name) = '${state.toUpperCase()}'
        `).select()
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: true, message: error.toString() })
        })
    }

    static getTourDatesByLocationV2(req, res) {
        // TODO - req body: [ lat, lon, city, state, country ]
        return null
    }

    // TODO - Change this!
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