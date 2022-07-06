const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Utilisateur = sequelize.define(
  'Utilisateur',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(40),
    },
    login: {
      type: DataTypes.STRING(20),
    },
    pass: {
      type: DataTypes.STRING(150),
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    groupe: {
      type: DataTypes.TEXT,
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
    tableName: 'co_utilisateur',
  }
);

Utilisateur.sync();
// Utilisateur.sync({ alter: true }).catch((err) => {
//   console.log(err);
// });

//export module to be reused in controllers
module.exports = sequelize.models.Utilisateur;
