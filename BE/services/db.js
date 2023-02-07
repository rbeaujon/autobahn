const mysql = require('mysql');
const config  = require('../lib/db/config');

exports.connection = () => {
  //Connection with MySQL
  let conn  = mysql.createConnection(config);


    conn.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to MySQL correctly.');
  })

  return conn
}
