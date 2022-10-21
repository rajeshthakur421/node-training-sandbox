const connection=require('../db/mysql.db.connection');
const bcrypt = require('bcrypt');

module.exports={
    createUser:(req, res)=>{
        const {username,password}=req.body;
        
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        connection.query(`INSERT INTO users(id, username, password) VALUES (0,'${username}','${hashPassword}')`,(err,result)=>{
     
            if(err){
              res.send({error:true,message:err.message});
            }else{
                if(result.affectedRows>0){
                    res.send({error:false,message:"New User Created"});
                }else{
                    res.send({error:false,message:"New User not Created"});
                }               
            }              
        })
    },

    userLogin:(req, res)=>{
        let username=req.body.username;
        let password=req.body.password;
        connection.query(`select * from users where username='${username}'`,(err,result)=>{
           if(err){
               res.send({error:true,message:err.message});
           }else{
               
              let isSame= bcrypt.compareSync(password,result[0].password); // true // false
             
              if(isSame){
               res.send({error:false,message:"User Logged IN"});
              }else{
               res.send({error:true,message:"Wrong User Name and Password"});
              }
              
             
           }
        })
   }
}