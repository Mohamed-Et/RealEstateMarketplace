const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Vente = require('./Vente');

const Versement = sequelize.define(
  'Versement',
  {
    // Model attributes are defined here
    idco_versement: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    date_versement: {
      type: DataTypes.DATE,
    },
    date_valeur: {
      type: DataTypes.DATE,
    },
    CIN: {
      type: DataTypes.STRING(25),
    },
    montant: {
      type: DataTypes.DOUBLE,
    },
    ref_versement: {
      type: DataTypes.STRING(45),
    },
    ref_rapprochement: {
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
    tableName: 'co_versement',
  }
);

// Vercement.sync({ alter: true }).catch((err) => {
//   console.log(err);
// });
Versement.sync();
//export module to be reused in controllers
module.exports = sequelize.models.Versement;
