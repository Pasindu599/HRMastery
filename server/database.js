const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pasindu',
  database: 'hrm',
});

module.exports = mysqlPool;
