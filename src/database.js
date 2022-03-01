const mysql = require("mysql")
const config = require("../core/config")
const mysql2 = require("mysql2/promise")


class Database {

    static getConnection() {
        const inProduction = config["in_production"]

        return mysql.createConnection({
            host: inProduction ? process.env.HOST : config.database.HOST,
            user: inProduction ? process.env.USER : config.database.USER,
            password: inProduction ? process.env.PASSWORD : config.database.PASSWORD,
            database: inProduction ? process.env.NAME : config.database.NAME
        })
    }

    static async getMySql2Connection() {
        const inProduction = config["in_production"]

        return mysql2.createConnection({
            host: inProduction ? process.env.HOST : config.database.HOST,
            user: inProduction ? process.env.USER : config.database.USER,
            password: inProduction ? process.env.PASSWORD : config.database.PASSWORD,
            database: inProduction ? process.env.NAME : config.database.NAME
        })
    }

    static connect() {
        this.getConnection().connect((error) => {
            if (error) return error
            console.log("MySQL Database connected!")
        })
    }

    static disconnect() {
        this.getConnection().end((error) => {
            if (error) return error
            console.log("DB connection end")
        })
    }
}


module.exports = Database
