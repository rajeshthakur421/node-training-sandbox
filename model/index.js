const Sequelize = require("sequelize");

//const sequelize = new Sequelize('Userdb2','root','',{host:'localhost',dialect:'mysql'})
const sequelize = new Sequelize(
  "u190533072_springbootapit",
  "u190533072_springbootapi",
  "@Gk8xry4PsWyaF@",
  { host: "sql208.main-hosting.eu", dialect: "mysql" }  
);

sequelize.authenticate().then(()=>{
    console.log("CONNECTED WITH DB")
}).catch(err=>{
    console.log("UNABLE TO CONNECT WITH DB",err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./users.model')(Sequelize,sequelize);
db.categories = require('./categories.model')(Sequelize,sequelize);
db.product = require('./product.model')(Sequelize,sequelize);

db.categories.hasMany(db.product);
db.product.belongsTo(db.categories);

module.exports = db;