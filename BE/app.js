const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql');
const config  = require('./config');
const Verification = require('./helper/verification');


//Connection with MySQL
let conn  = mysql.createConnection(config);

conn.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to MySQL correctly.');
});

// cross-origin requests and data transfers
app.use(cors({
	origin: '*',
	methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// to process data sent in an HTTP request body
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());


app.get('/sectors', cors(), (req, res, next) => {

    let sql = `SELECT * FROM sectors` 
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
})

app.get('/registered', cors(), (req, res, next) => {

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
})

app.post('/register', cors(), (req, res, next) => {

  const {userId, fieldId, session } = req.body;
  const isVerified = Verification(userId, fieldId, session)

  if(isVerified === "Empty"){
      console.log(`Partial Content, json with some fields empties.`);
      res
      .set('Content-Type', 'application/json')
      .status(206)
      .json(`Partial Content, json with some fields empties.`)
    
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
})

app.post('/getsession', cors(), (req, res, next) => {

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
})

app.listen(3001);