const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Associer = sequelize.define(
  'Associer',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'current',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
  },
  {
    tableName: 'co_associers',
  }
);
// Associer.sync({ alter: true }).catch((err) => {
//   console.log(err);
// });
Associer.sync();
//export module to be reused in controllers
module.exports = sequelize.models.Associer;
