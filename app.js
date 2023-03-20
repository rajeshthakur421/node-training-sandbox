var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const loginRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const productRouter = require("./routes/products");

const db = require("./model/index");
const middleware = require("./middleware/jwt.middleware");

const app = express();

//test git...

/*var corsOptions = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();  
};*/

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

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
