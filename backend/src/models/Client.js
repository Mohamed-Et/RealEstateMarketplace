const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Client = sequelize.define(
  'Client',
  {
    // Model attributes are defined here
    idco_client: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(45),
    },
    prenom: {
      type: DataTypes.STRING(45),
    },
    cin: {
      type: DataTypes.STRING(10),
    },
    mobile: {
      type: DataTypes.STRING(25),
    },
    e_mail: {
      type: DataTypes.STRING(45),
    },
    adresse: {
      type: DataTypes.STRING(200),
    },
    date_naissance: {
      type: DataTypes.DATE,
    },
    adresse2: {
      type: DataTypes.STRING(200),
    },
    telephone: {
      type: DataTypes.STRING(25),
    },
    associer: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'current',
    },
  },
  {
    // Other model options go here
    //By default : if Model name = Client then Table name = Clients
    //We can specify table name directly using :
    tableName: 'co_client',
    //By default sequelize will add createdAt and updatedAt to the table,
    //to cancel add the line below
    //timestamps: false,
  }
);
//This checks what is the current state of the table in the database (which columns it has, what are their data types, etc),
//and then performs the necessary changes in the table to make it match the model.
Client.sync({ alter: true });
Client.sync({ force: true });
// `sequelize.define` also returns the model
console.log(Client === sequelize.models.Client); // true
//export module to be reused in controllers
module.exports = sequelize.models.Client;
