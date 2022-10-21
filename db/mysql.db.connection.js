const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodetraining",
});
  
connection.connect((err) => {
    // connection test
    //   if(err){console.log(err.message)}else{console.log("connected with studDB")}
  
    err ? console.log(err.message) : console.log("connected with nodetraining");
});
  
module.exports = connection;
  