const mysql = require("mysql");

// XAMPP
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "portfolio"
})

module.exports = connection;