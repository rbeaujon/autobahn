const {connection} = require('../services/db');
let conn =  connection();

exports.postSession = (req, res) => {

  const {session} = req.body;
  let sqlGetSession = `SELECT * FROM  registered  WHERE session = "${session}"` 
  conn.query(sqlGetSession, (err, result) => {

    if(err){
      res
      .set('Content-Type', 'application/json')
      .status(500)
      .json(`Internal server error, the request return ${err}`)
      console.log(`Problems getting the session user data, ${err}.`)
    } else {
      res
      .set('Content-Type', 'application/json')
      .status(200)
      .json(result)
    }
  })
}