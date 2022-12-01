var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./model");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//db.sequelize.sync({force:true});
db.sequelize.sync({});

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;

//file upload // email // scheduling // server side pagination // fs // git // sq joins
