const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  user: "u190533072_springbootapi",
  password: "@Gk8xry4PsWyaF@",
  database: "u190533072_springbootapit",
  port: 3306,
});

connection.connect((err) => {
  // connection test
  //   if(err){console.log(err.message)}else{console.log("connected with studDB")}

  err ? console.log(err.message) : console.log("connected with nodetraining");
});

module.exports = connection;
