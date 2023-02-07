const {connection} = require('../services/db');
let conn =  connection();


exports.getSectors = (req, res) => {
    let sql = `SELECT * FROM sectors` 
    conn.query(sql, (err, result) => {
      if (err) {
        console.log(`Failed to get the sectors,  ${err}.`);
        res
        .set('Content-Type', 'application/json')
        .status(500)
        .json(`Internal server error, the request return ${err}`)
      } else {
        res
        .set('Content-Type', 'application/json')
        .status(200)
        .json(result)
      }
    });
};

