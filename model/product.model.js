module.exports = (Sequelize,sequelize)=>{
  const model = sequelize.define(
      "product",
      {
          prod_id:{
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false
          },
          prod_name:{
              type:Sequelize.STRING,
              allowNull: false,
          },
          prod_qty:{
            type:Sequelize.INTEGER,
            allowNull:false,  
          },
          created_by:{
              type:Sequelize.INTEGER,
              allowNull: false
          },
          
      },
      {
          freezeTableName: true,
          timestamps : false,
      }
  );
  return model;
};