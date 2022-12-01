module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      mobile: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      //   timestamps: true,
      //   createdAt: "created_at",
      //   updatedAt: "updated_at"
    }
  );

  return model;
};
