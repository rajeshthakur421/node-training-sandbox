const db = require("../model/index");
const product = db.product;
const sequelize = db.sequelize;

module.exports = {
    getAll: (req, res) => {
    var pageNumber = parseInt(req.body.page);
    var numberofRows = parseInt(req.body.limit);
    var offset = (pageNumber - 1) * numberofRows;
    var fetchRow = numberofRows;
    product
      .findAndCountAll({
        attributes: ["prod_id", "prod_name", "categoryCatId","prod_qty","created_by"],
        include: { model: db.categories,attributes: ['cat_id','cat_name','created_by']},
        offset: offset,
        limit: fetchRow,
      })
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  createProduct: (req, res) => {    
      let prodRequest = { prod_name: req.body.prod_name, categoryCatId:req.body.categoryCatId, prod_qty:req.body.prod_qty, created_by: req.body.created_by };
      product
        .create(prodRequest)
        .then((product) => {
          res.send(product);
        })
        .catch((err) => {
          res.send(err);
        });    
  },  
  updateProduct: (req, res) => {
    let cat_id = req.params.cat_id;
    categories
      .update({ cat_name: req.body.cat_name }, { where: { cat_id: cat_id } })
      .then((data) => {
        if (data > 0) {
          res.send({ error: false, message: "Categories updated" });
        } else {
          res.send({ error: false, message: "Categories not updated" });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },
  searchProduct:(req, res)=>{
    const cat_id=req.params.id;
    categories
      .findAll({where:{cat_id:cat_id}})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  deleteProduct:(req, res)=>{
    let id=req.params.id;
    categories.destroy({where:{id:id},truncate:false}).then((data) => {
        if(data>0){
            res.send({error:false, message:"User deleted"});
        }else{
            res.send({error:false, message:"User not deleted"}); 
        }

    }).catch((err) => {
        res.send(err);
      });
  },
  
  
};
