const mysql = require('mysql2');

 const pool = mysql.createPool({
   host: '194.238.17.64',
   user: 'ramanasoft',
   password: "Ramanasoft@123",
   database: 'ramanasoft_testing'
 });

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the MySQL database');
    connection.release();
  }
});

module.exports = pool;

