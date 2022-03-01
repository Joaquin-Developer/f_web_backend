const Database = require("../database")
const mysql2 = require("mysql2/promise")


module.exports = class Query {

    constructor(query) {
        this.query = query
    }

    select() {
        const promise = new Promise((resolve, reject) => {
            Database.getConnection().query(this.query, (error, rows) => {
                if (error) return reject(error)
                return resolve(JSON.stringify(rows))
            })
        })
        // disconnect()
        return promise
    }

    insert(queryParams) {
        return new Promise((resolve, reject) => {
            Database.getConnection().query(this.query, queryParams, (error, result) => {
                if (error) return reject(error)
                return resolve(JSON.stringify(result))
            })
        })
    }

    /**
     * @param {*} show 
     * @param {*} scenary 
     * @param {*} place 
     * @param {*} showDate 
     * @param {*} tourId 
     * @returns JSON
     * TODO: Mejorar manejador de excepciones
     */
    static async update(show, scenary, place, showDate, tourId) {
        const connection = await Database.getMySql2Connection()
        connection.execute(`
            UPDATE TOUR
            SET 
                tour_show = ?,
                scenary = ?,
                place = ?,
                show_date = ?
            WHERE tour_id = ?
        `, [show, scenary, place, showDate, tourId])

        return { error: false, message: "OK" }
    }


    static async deleteTourDate(idTourDate) {
        const connection = await Database.getMySql2Connection()

        try {
            await connection.execute("DELETE FROM TOUR WHERE tour_id = ?", [idTourDate])

            // if not problems:
            // await connection.commit()
            // connection.destroy()  // ??
            return { error: false, message: "OK" }

        } catch (error) {
            // connection.rollback();
            return { error: true, message: "Failed to delete data" }
        }
    }

}