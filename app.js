var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const loginRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const productRouter = require("./routes/products");

const db = require("./model/index");
const middleware = require("./middleware/jwt.middleware");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

db.sequelize.sync({});

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use('/users',middleware.checkToken, usersRouter);
app.use("/categories", categoriesRouter);
app.use("/product", productRouter);

app.use("/user", loginRouter);

module.exports = app;
