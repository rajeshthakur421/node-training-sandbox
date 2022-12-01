const Sequelize = require("sequelize");

//const sequelize = new Sequelize('Userdb2','root','',{host:'localhost',dialect:'mysql'})
const sequelize = new Sequelize(
  "u190533072_springbootapit",
  "u190533072_springbootapi",
  "@Gk8xry4PsWyaF@",
  { host: "sql208.main-hosting.eu", dialect: "mysql" }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connected with DB");
  })
  .catch((err) => {
    console.log("unable to connect with DB", err);
  });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require("./users.model")(sequelize, Sequelize);
db.dept = require("./dept.model")(sequelize, Sequelize);

db.dept.hasMany(db.users);
db.users.belongsTo(db.dept);

module.exports = db;
