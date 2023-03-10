const Verification = require('../helper/verification');
const {connection} = require('../services/db');

let conn =  connection();

exports.getRegister =  (req, res) => {

  //Getting data from MySQL server

  let sql = `SELECT * FROM  registered` 
  
  //Executing the sql insert statement
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(`Failed getting the registered user list,  ${err}.`);
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
  })
}

exports.postRegister = (req, res) => {

  const {userId, fieldId, session } = req.body;
  const isVerified = Verification (userId, fieldId, session)

  if(isVerified === "Empty"){
      console.log(`Partial Content, json with some fields emptied.`);
      res
      .set('Content-Type', 'application/json')
      .status(206)
      .json(`Partial Content, json with some fields emptied.`)
    
  }else if(isVerified === "Type") {
    console.log(`Bad Request.`);
    res
    .set('Content-Type', 'application/json')
    .status(400)
    .json(`Bad Request.`)
  }else if(isVerified === "Ok"){

    let sqlToCheckIsRegistered = `SELECT * FROM  registered  WHERE session = "${session}"` 
    conn.query(sqlToCheckIsRegistered, (err, result) => {
  
      if(err){
        console.log(`Problems consulting the registered users, ${err}.`)
      } else if (result.length > 0) {
        
        let sql = `UPDATE registered SET userId="${userId}", fieldId="${fieldId}"  WHERE session="${session}"` 
    
        // executing the sql update statement
        conn.query(sql, (err) => {
          if (err) {
            console.log(`Update failed,  ${err}.`);
            res
            .set('Content-Type', 'application/json')
            .status(500)
            .json(`Internal server error, the request return ${err}`)
          } else {
            res
            .set('Content-Type', 'application/json')
            .status(201)
            .json(`The register was successfully updated`)
          }
        });
      } else {
  
        let sql = `INSERT INTO registered (userId, fieldId, session) VALUES ("${userId}", "${fieldId}", "${session}")` 
    
        // executing the sql insert statement
        conn.query(sql, (err) => {
          if (err) { 
            console.log(`Insert failed,  ${err}.`);
            res
            .set('Content-Type', 'application/json')
            .status(500)
            .json(`Internal server error, the request return ${err}`)
          } else {
            res
            .set('Content-Type', 'application/json')
            .status(201)
            .json(`The register was successfully saved`)
          }
        });
      }
    })
  }
}