module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define(
    "dept",
    {
      did: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dName: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      dEmail: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
