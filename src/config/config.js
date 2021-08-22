const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Ra$kyWalks!66Psbg",
    database:"employeetracker"
});

module.exports = connection;