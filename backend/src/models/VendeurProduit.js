const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Vente = require('./Vente');
const Produit = require('./Produit');

const VendeurProduit = sequelize.define(
  'VendeurProduit',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    idvendeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_du: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_au: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lieux: {
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
    tableName: 'co_vendeur_produit',
  }
);

VendeurProduit.sync();
// VendeurProduit.sync({ alter: true }).catch((err) => {
//   console.log(err);
// });
// sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(function () {
//   sequelize.sync({ force: true }).then(function () {
//     sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
//   });
// });

//export module to be reused in controllers
module.exports = sequelize.models.VendeurProduit;
