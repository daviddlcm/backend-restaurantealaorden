require("dotenv").config()

const mysql = require("mysql2/promise")

const config = {
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,
}

const createConnection = async () => { return await mysql.createConnection(config)}

module.exports = {createConnection}