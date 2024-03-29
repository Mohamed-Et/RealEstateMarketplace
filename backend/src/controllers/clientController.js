const Client = require('../models/Client');
const Vente = require('../models/Vente');
const Op = require('sequelize').Op;
//get all
exports.getAll = async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: {
        status: {
          [Op.not]: 'deleted',
        },
      },
      include: Vente,
    });
    res.status(200).json(clients);
  } catch (error) {
    res.send(error);
  }
};
//get by ID
exports.getByID = async (req, res) => {
  const idClient = req.params.id;
  try {
    const client = await Client.findOne({
      where: { idco_client: idClient },
      include: Vente,
    });
    res.status(200).json(client);
  } catch (error) {
    res.send(error);
  }
};
//get by VenteID
exports.getByVenteID = async (req, res) => {
  const venteID = req.params.venteId;
  try {
    const client = await Client.findOne({
      include: [
        {
          model: Vente,
          where: { idco_vente: venteID },
        },
      ],
    });
    res.status(200).json(client);
  } catch (error) {
    res.send(error);
  }
};
//get by RefUpdateID
exports.getByRefID = async (req, res) => {
  const refUpdate = req.params.refId;
  try {
    const client = await Client.findAll({ where: { refUpdate: refUpdate } });
    res.status(200).json(client);
  } catch (error) {
    res.send(error);
  }
};
//add new client or duplicate client
exports.create = async (req, res) => {
  const { action, currentClientID } = req.query;
  let refUpdate = null;
  let status = 'current';
  if (action === 'update') {
    refUpdate = currentClientID;
    status = 'old';
  }
  const {
    nom,
    prenom,
    cin,
    mobile,
    e_mail,
    adresse,
    date_naissance,
    adresse2,
    telephone,
  } = req.body;
  try {
    const newClient = await Client.create({
      nom: nom,
      prenom: prenom,
      cin: cin,
      mobile: mobile,
      e_mail: e_mail,
      adresse: adresse,
      date_naissance: date_naissance,
      adresse2: adresse2,
      telephone: telephone,
      status: status,
      refUpdate: refUpdate,
    });
    res.status(201).json(newClient);
  } catch (error) {
    res.send(error);
  }
};

//update client
exports.update = async (req, res) => {
  const clientID = req.params.id;
  const {
    nom,
    prenom,
    cin,
    mobile,
    e_mail,
    adresse,
    date_naissance,
    adresse2,
    telephone,
    associer,
  } = req.body;
  let fieldsToChange = ['status'];
  for (const [key, value] of Object.entries(req.body)) {
    if (value !== null) fieldsToChange.push(key);
  }

  try {
    await Client.update(
      {
        nom: nom,
        prenom: prenom,
        cin: cin,
        mobile: mobile,
        e_mail: e_mail,
        adresse: adresse,
        date_naissance: date_naissance,
        adresse2: adresse2,
        telephone: telephone,
        associer: associer,
        status: 'current',
      },
      {
        where: {
          idco_client: clientID,
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
  const clientID = req.params.id;
  try {
    await Client.update(
      { status: 'deleted' },
      {
        where: {
          idco_client: clientID,
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
  const clientID = req.params.id;
  try {
    await Client.destroy({
      where: {
        idco_client: clientID,
      },
    });
    res.status(204).send('deleted successfully');
  } catch (error) {
    res.send(error);
  }
};
// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
