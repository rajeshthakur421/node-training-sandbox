const db = require("../model/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const users = db.users;
const sequelize = db.sequelize;

module.exports = {
  createUser: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({
        errors: errors.array(),
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashpassword = bcrypt.hashSync(req.body.Password, salt);

      let user = {
        Name: req.body.Name,
        Mobile: req.body.Mobile,
        Email: req.body.Email,
        Password: hashpassword,
      };

      users
        .create(user)
        .then((users) => {
          res.send({
            error: false,
            message: "New user created",
          });
          //res.send({ error: false, message: "User created" }, users);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  },
  getAll: (req, res) => {
    var pageNumber = parseInt(req.body.page);
    var numberofRows = parseInt(req.body.limit);
    var offset = (pageNumber - 1) * numberofRows;
    var fetchRow = numberofRows;
    users
      .findAndCountAll({
        attributes: ["id", "Name", "mobile"],
        offset: offset,
        limit: fetchRow,
      })
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  updateUser: (req, res) => {
    let id = req.params.id;
    users
      .update({ Mobile: req.body.mobile }, { where: { id: id } })
      .then((data) => {
        if (data > 0) {
          res.send({ error: false, message: "User updated" });
        } else {
          res.send({ error: false, message: "User not updated" });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },
  searchUser: (req, res) => {
    const id = req.params.id;
    users
      .findAll({ where: { id: id } })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  deleteUser: (req, res) => {
    let id = req.params.id;
    users
      .destroy({ where: { id: id }, truncate: false })
      .then((data) => {
        if (data > 0) {
          res.send({ error: false, message: "User deleted" });
        } else {
          res.send({ error: false, message: "User not deleted" });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },

  loginUser: (req, res) => {
    let userName = req.body.userName;
    let Password = req.body.Password;

    sequelize
      .query(`select * from users where Email='${userName}'`)
      .then((result) => {
        let isSame = bcrypt.compareSync(Password, result[0][0].Password);

        if (isSame) {
          let token = jwt.sign(
            {
              id: result[0].id,
              Name: result[0].Name,
            },
            "secretKey",
            {
              algorithm: "HS256",
              expiresIn: "1h",
            }
          );
          res.send({
            error: false,
            token: token,
            message: "User Logged IN",
          });
        } else {
          res.send({
            error: true,
            message: "Wrong Username and Password",
          });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
