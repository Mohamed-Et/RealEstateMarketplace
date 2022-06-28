const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Client = require('./Client');

const Vente = sequelize.define(
  'Vente',
  {
    // Model attributes are defined here
    idco_vente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    promotion: {
      type: DataTypes.DOUBLE,
    },
    prix_vente: {
      type: DataTypes.DOUBLE,
    },
    condition: {
      type: DataTypes.STRING(145),
    },
    statut_vente: {
      type: DataTypes.STRING(15),
      defaultValue: 'provisoire',
      allowNull: false,
      comment: 'provisoire, definitive, annuler',
    },
    notaire: {
      type: DataTypes.INTEGER,
    },
    credit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    accord: {
      type: DataTypes.BOOLEAN,
    },
    datecre: {
      type: DataTypes.DATE,
    },
    par: {
      type: DataTypes.STRING(45),
    },
    id_adm: {
      type: DataTypes.INTEGER,
    },
    date_adm: {
      type: DataTypes.DATE,
    },
    observation: {
      type: DataTypes.STRING(245),
    },
    id_vendeur: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'current',
    },
    refUpdate: {
      type: DataTypes.INTEGER(10),
    },
    refDelete: {
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
    tableName: 'co_vente',
  }
);
Vente.sync();
// Vente.sync({ alter: true }).catch((err) => {
//   console.log(err);
// });
// sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(function () {
//   sequelize.sync({ force: true }).then(function () {
//     sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
//   });
// });

//export module to be reused in controllers
module.exports = sequelize.models.Vente;
