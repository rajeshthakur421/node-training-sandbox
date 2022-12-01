const db = require("../model");
const sequelize = db.sequelize;
const users = db.users;
const dept=db.dept;
module.exports = {
  //   getAll: (req, res) => {
  //     sequelize
  //       .query("select * from users", {
  //         replacements: [],
  //         type: Sequelize.SELECT,
  //       })
  //       .then((data) => {
  //         res.send(data[0]);
  //       })
  //       .catch((err) => {
  //         res.send(err);
  //       });
  //   },

  getAll: (req, res) => {
    var pageNmber = parseInt(req.body.page);//1
    var numberofRows = parseInt(req.body.limit);//10
    var offset = (pageNmber - 1) * numberofRows;
    var fetchrow = numberofRows;
    users
      .findAndCountAll({attributes: ['id','Name','mobile'],include: { model: db.dept,attributes: ['did','dName']},offset: offset, limit: fetchrow})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  searchUser:(req, res)=>{
    const id=req.params.id;
    users
      .findAll({where:{id:id},include: { model: db.dept}})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  createUser: (req, res) => {
    
    let user = { Name: req.body.Name, mobile: req.body.mobile,deptDid:req.body.Did};
    users
      .create(user)
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  updateUser:(req, res)=>{
    let id=req.params.id;
    users.update({mobile:req.body.mobile},{where:{id:id}}).then((data) => {
        if(data>0){
            res.send({error:false, message:"User updated"});
        }else{
            res.send({error:false, message:"User not updated"}); 
        }

    }).catch((err) => {
        res.send(err);
      });
  }, 
  deleteUser:(req, res)=>{
    let id=req.params.id;
    users.destroy({where:{id:id},truncate:false}).then((data) => {
        if(data>0){
            res.send({error:false, message:"User deleted"});
        }else{
            res.send({error:false, message:"User not deleted"}); 
        }

    }).catch((err) => {
        res.send(err);
      });
  }
};
