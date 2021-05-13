const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


//Convert pool object to promise based object
const promisePool = pool.promise();

module.exports = promisePool;
