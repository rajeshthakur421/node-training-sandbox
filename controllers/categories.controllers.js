const db = require("../model/index");
const categories = db.categories;
const sequelize = db.sequelize;

module.exports = {
    getAll: (req, res) => {
    var pageNumber = parseInt(req.body.page);
    var numberofRows = parseInt(req.body.limit);
    var offset = (pageNumber - 1) * numberofRows;
    var fetchRow = numberofRows;
    categories
      .findAndCountAll({
        attributes: ["cat_id","cat_name","created_by"],
        offset: offset,
        limit: fetchRow,
      })
      .then((categories) => {
        res.send(categories);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  createCategories: (req, res) => {    
      let catRequest = { cat_name: req.body.cat_name, created_by: req.body.created_by };
      categories
        .create(catRequest)
        .then((categories) => {
          res.send(categories);
        })
        .catch((err) => {
          res.send(err);
        });    
  },  
  updateCategories: (req, res) => {
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
  searchCategories:(req, res)=>{
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
  deleteCategories:(req, res)=>{
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
