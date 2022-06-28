const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Vente = require('./Vente');
const VendeurProduit = require('./VendeurProduit');

const Produit = sequelize.define(
  'Produit',
  {
    // Model attributes are defined here
    idco_produit: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    num_produit: {
      type: DataTypes.STRING(45),
    },
    id_consistance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    titre_foncier: {
      type: DataTypes.STRING(45),
    },
    voie: {
      type: DataTypes.STRING(45),
    },
    orientation: {
      type: DataTypes.STRING(45),
    },
    superficie: {
      type: DataTypes.DOUBLE,
    },
    prix_m2: {
      type: DataTypes.DOUBLE,
    },
    prix: {
      type: DataTypes.DOUBLE,
    },
    statut_produit: {
      type: DataTypes.STRING(20),
    },
    date: {
      type: DataTypes.DATE,
    },
    par: {
      type: DataTypes.STRING(45),
    },
    situation: {
      type: DataTypes.STRING(200),
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
    tableName: 'co_produit',
  }
);
//vente
Vente.belongsTo(Produit, {
  foreignKey: 'idproduit',
});
Produit.hasMany(Vente, {
  foreignKey: 'idproduit',
});
//vendeur produit
VendeurProduit.belongsTo(Produit, {
  foreignKey: 'idproduit',
});
Produit.hasMany(VendeurProduit, {
  foreignKey: 'idproduit',
});
Produit.sync();
// Produit.sync({ alter: true }).catch((err) => {
//   console.log(err);
// });
// sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(function () {
//   sequelize.sync({ force: true }).then(function () {
//     sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
//   });
// });

//export module to be reused in controllers
module.exports = sequelize.models.Produit;
