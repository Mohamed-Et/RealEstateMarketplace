const Client = require('../models/Client');
const Vente = require('../models/Vente');
const Associer = require('../models/Associer');
const Op = require('sequelize').Op;
//get all
exports.getAll = async (req, res) => {
  try {
    const associers = await Associer.findAll({
      include: [Vente, Client],
    });
    res.status(200).json(associers);
  } catch (error) {
    res.send(error);
  }
};
//get by ID
exports.getByID = async (req, res) => {
  const idAssocier = req.params.id;
  try {
    const associer = await Associer.findOne({
      where: { id: idAssocier },
      include: [Vente, Client],
    });
    res.status(200).json(associer);
  } catch (error) {
    res.send(error);
  }
};

//add new associer or duplicate associer
exports.create = async (req, res) => {
  const { idvente, idclient } = req.params;
  // check if ids exist
  const client = await Client.findOne({
    where: { idco_client: idclient },
  });
  const vente = await Vente.findOne({
    where: { idco_vente: idvente },
  });
  if (!vente || !client) {
    return res.status(400).json({ sucess: true, data: [] });
  }
  try {
    const newAssocier = await Associer.create({
      idvente: idvente,
      idclient: idclient,
    });
    res.status(201).json(newAssocier);
  } catch (error) {
    res.send(error);
  }
};

//delete associer
exports.deleteUpdate = async (req, res) => {
  const associerID = req.params.id;
  try {
    await Associer.update(
      { status: 'deleted' },
      {
        where: {
          id: associerID,
        },
      }
    );
    //no response on postman
    res.status(204).json({ succes: true });
  } catch (error) {
    res.send(error);
  }
};

//delete for developement
exports.delete = async (req, res) => {
  const associerID = req.params.id;
  try {
    await Associer.destroy({
      where: {
        id: associerID,
      },
    });
    res.status(204).send('deleted successfully');
  } catch (error) {
    res.send(error);
  }
};
// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
