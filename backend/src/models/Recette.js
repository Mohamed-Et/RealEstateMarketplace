const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Versement = require('./Versement');

const Recette = sequelize.define(
  'Recette',
  {
    // Model attributes are defined here
    idco_recette: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    date_av: {
      type: DataTypes.DATE,
    },
    date_limite: {
      type: DataTypes.DATE,
    },
    num_av: {
      type: DataTypes.STRING(45),
    },
    montant: {
      type: DataTypes.DOUBLE,
    },
    emise_par: {
      type: DataTypes.STRING(45),
    },
    emise_le: {
      type: DataTypes.DATE,
    },
    rib: {
      type: DataTypes.INTEGER,
    },
    recu: {
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
    tableName: 'co_recette',
  }
);
//!vercement
Versement.belongsTo(Recette, {
  foreignKey: 'idrecette',
});
Recette.hasMany(Versement, {
  foreignKey: 'idrecette',
});
// Recette.sync({ force: true }).catch((err) => {
//   console.log(err);
// });
Recette.sync();
//export module to be reused in controllers
module.exports = sequelize.models.Recette;
