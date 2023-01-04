module.exports = (Sequelize,sequelize)=>{
  const model = sequelize.define(
      "categories",
      {
          cat_id:{
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false
          },
          cat_name:{
              type:Sequelize.STRING,
              allowNull: false,
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