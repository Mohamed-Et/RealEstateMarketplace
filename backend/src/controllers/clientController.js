const Client = require('../models/Client');

exports.getAll = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.send(error);
  }
};

exports.getByID = async (req, res) => {
  const idClient = req.params.id;
  try {
    const client = await Client.findOne({ where: { idco_client: idClient } });
    res.status(200).json(client);
  } catch (error) {
    res.send(error);
  }
};

exports.create = async (req, res) => {
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
    });
    res.status(201).json(newClient);
  } catch (error) {
    res.send(error);
  }
};
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
        status: 'old',
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

exports.delete = async (req, res) => {
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

// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
