const connection = require("../db/mysql.db.connection");

module.exports = {
  getAllProducts: (req, res) => {
    connection.query("SELECT * FROM products", (err, result) => {
      if (err) {
        res.send({ error: true, message: err.message });
      } else {
        res.send({ error: false, data: result });
      }
    });
  },
  addProducts: (req, res) => {
    const { products_name, product_qty, products_description } = req.body;

    connection.query(
      `INSERT INTO products(id, products_name, product_qty, products_description) VALUES (0,'${products_name}','${product_qty}','${products_description}')`,
      (err, result) => {
        if (err) {
          res.send({ error: true, message: err.message });
        } else {
          if (result.affectedRows > 0) {
            res.send({
              error: false,
              message: "New products created with Id ",
            });
          } else {
            res.send({ error: false, message: "New products not created" });
          }
        }
      }
    );
  },
  updateProducts: (req, res) => {
    let id = req.params.id;
    let products_name = req.body.products_name;

    connection.query(
      `UPDATE products SET products_name='${products_name}' WHERE id=${id}`,
      (err, result) => {
        if (err) {
          res.send({ error: true, message: err.message });
        } else {
          if (result.affectedRows > 0) {
            res.send({ error: false, message: "Products name Updated" });
          } else {
            res.send({ error: false, message: "Products not Updated" });
          }
        }
      }
    );
  },
  deleteProducts: (req, res) => {
    let id = req.params.id;
    connection.query(`DELETE FROM products WHERE id=${id}`, (err, result) => {
      if (err) {
        res.send({ error: true, message: err.message });
      } else {
        if (result.affectedRows > 0) {
          res.send({ error: false, message: "products removed" });
        } else {
          res.send({ error: false, message: "Not removed" });
        }
      }
    });
  },
};
