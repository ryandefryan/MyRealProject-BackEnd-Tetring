const mysql = require('mysql')

const db = mysql.createConnection({
    user : 'root',
    password : '20121995',
    database : 'authentic_system',
    port : '3306'
})

module.exports = db