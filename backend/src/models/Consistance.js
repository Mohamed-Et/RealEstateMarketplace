const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Produit = require('./Produit');

const Consistance = sequelize.define(
  'Consistance',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_projet: {
      type: DataTypes.INTEGER,
    },
    id_tranche: {
      type: DataTypes.INTEGER,
    },
    id_categorie: {
      type: DataTypes.INTEGER,
    },
    id_type: {
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.INTEGER,
    },
    superficie: {
      type: DataTypes.DOUBLE,
    },
    par: {
      type: DataTypes.STRING(45),
    },
    date: {
      type: DataTypes.DATE,
    },
    projet: {
      type: DataTypes.STRING(150),
    },
    tranche: {
      type: DataTypes.STRING(150),
    },
    categorie: {
      type: DataTypes.STRING(45),
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'current',
    },
    refUpdate: {
      type: DataTypes.INTEGER(10),
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
    tableName: 'co_consistance',
  }
);

Consistance.sync();
// Consistance.sync({ alter: true }).catch((err) => {
//   console.log(err);
// });

//export module to be reused in controllers
module.exports = sequelize.models.Consistance;
