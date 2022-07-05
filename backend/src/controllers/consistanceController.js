const Produit = require('../models/Produit');
const Consistance = require('../models/Consistance');
const Op = require('sequelize').Op;
//get all
exports.getAll = async (req, res) => {
  try {
    const consitance = await Consistance.findAll({
      where: {
        status: {
          [Op.not]: 'deleted',
        },
      },
      include: Produit,
    });
    res.status(200).json(consitance);
  } catch (error) {
    res.send(error);
  }
};
//get by ID
exports.getByID = async (req, res) => {
  const idConsistance = req.params.id;
  try {
    const consistance = await Consistance.findOne({
      where: { id: idConsistance },
      include: Produit,
    });
    res.status(200).json(consistance);
  } catch (error) {
    res.send(error);
  }
};

//get by RefUpdateID
exports.getByRefID = async (req, res) => {
  const refUpdate = req.params.refId;
  try {
    const consistance = await Consistance.findAll({
      where: { refUpdate: refUpdate },
    });
    res.status(200).json(consistance);
  } catch (error) {
    res.send(error);
  }
};
//add new consistance or duplicate consistance
exports.create = async (req, res) => {
  const { action, currentConsistanceID } = req.query;
  let refUpdate = null;
  let status = 'current';
  if (action === 'update') {
    refUpdate = currentConsistanceID;
    status = 'old';
  }
  const {
    id_projet,
    id_tranche,
    id_categorie,
    id_type,
    nombre,
    superficie,
    par,
    date,
    projet,
    tranche,
    categorie,
  } = req.body;
  try {
    const newConsistance = await Consistance.create({
      id_projet: id_projet,
      id_tranche: id_tranche,
      id_categorie: id_categorie,
      id_type: id_type,
      nombre: nombre,
      superficie: superficie,
      par: par,
      date: date,
      projet: projet,
      tranche: tranche,
      categorie: categorie,
      status: status,
      refUpdate: refUpdate,
    });
    res.status(201).json(newConsistance);
  } catch (error) {
    res.send(error);
  }
};

//update client
exports.update = async (req, res) => {
  const consistanceID = req.params.id;
  const {
    id_projet,
    id_tranche,
    id_categorie,
    id_type,
    nombre,
    superficie,
    par,
    date,
    projet,
    tranche,
    categorie,
  } = req.body;
  let fieldsToChange = ['status'];
  for (const [key, value] of Object.entries(req.body)) {
    if (value !== null) fieldsToChange.push(key);
  }

  try {
    await Consistance.update(
      {
        id_projet: id_projet,
        id_tranche: id_tranche,
        id_categorie: id_categorie,
        id_type: id_type,
        nombre: nombre,
        superficie: superficie,
        par: par,
        date: date,
        projet: projet,
        tranche: tranche,
        categorie: categorie,
        status: 'current',
      },
      {
        where: {
          id: consistanceID,
        },
        fields: fieldsToChange,
      }
    );
    //no response on postman
    res.status(204).json({ succes: true });
  } catch (error) {
    res.send(error);
  }
};
//delete client
exports.deleteUpdate = async (req, res) => {
  const consistanceID = req.params.id;
  try {
    await Consistance.update(
      { status: 'deleted' },
      {
        where: {
          id: consistanceID,
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
  const consistanceID = req.params.id;
  try {
    await Consistance.destroy({
      where: {
        id: consistanceID,
      },
    });
    res.status(204).send('deleted successfully');
  } catch (error) {
    res.send(error);
  }
};
// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
