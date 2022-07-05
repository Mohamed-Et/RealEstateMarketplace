const Vente = require('../models/Vente');
const Client = require('../models/Client');
const Produit = require('../models/Produit');
const VendeurProduit = require('../models/VendeurProduit');
const Op = require('sequelize').Op;
var moment = require('moment');
//get all
exports.getAll = async (req, res) => {
  try {
    const vendeurProduit = await VendeurProduit.findAll({
      where: {
        status: {
          [Op.not]: 'deleted',
        },
      },
      include: [Produit, Vente],
    });
    res.status(200).json(vendeurProduit);
  } catch (error) {
    res.send(error);
  }
};
//get specific vendeurP by Id vendeurP using ?params=vendeurP
//get specific vendeurP linked with a specific produit using ?params=produit
exports.getByID = async (req, res) => {
  const param = req.query.param;
  const id = req.params.id;
  if (param === 'vendeurP') {
    try {
      const vendeurP = await VendeurProduit.findOne({
        where: { id: id },
        include: [Produit, Vente],
      });
      res.status(200).json(vendeurP);
    } catch (error) {
      res.send(error);
    }
  } else if (param === 'produit') {
    try {
      const vendeurP = await VendeurProduit.findAll({
        where: { idproduit: id },
        include: [Produit, Vente],
      });
      res.status(200).json(vendeurP);
    } catch (error) {
      res.send(error);
    }
  }
};

//get by RefUpdateID
exports.getByRefID = async (req, res) => {
  const refUpdate = req.params.refId;
  try {
    const vendeurP = await VendeurProduit.findAll({
      where: { refUpdate: refUpdate },
    });
    res.status(200).json(vendeurP);
  } catch (error) {
    res.send(error);
  }
};
//test
exports.test = async (req, res) => {
  const { idvendeur, idproduit } = req.params;
  try {
    const existingVendeur = await VendeurProduit.findAll({
      where: {
        idvendeur: idvendeur,
        idproduit: idproduit,
      },
      include: Produit,
    });
    // const filtered = existingVendeur.map((vendeur) => ({
    //   date_du: vendeur.date_du,
    //   date_au: vendeur.date_au,
    // }));
    const dates = existingVendeur.filter((vendeur) => {
      return (
        moment('2022-10-10').isBetween(vendeur.date_du, vendeur.date_au) ||
        moment('2022-07-10').isBetween(vendeur.date_du, vendeur.date_au)
      );
    });
    res.status(200).json(dates);
  } catch (error) {
    res.send(error);
  }
};
//add new vendeurP or duplicate vendeurP
exports.create = async (req, res) => {
  const { action, currentVendeurID, idvendeur, idproduit } = req.query;
  let refUpdate = null;
  let status = 'current';
  if (action === 'update') {
    refUpdate = currentVendeurID;
    status = 'old';
  }
  let { date_du, date_au, lieux } = req.body;
  date_du = moment(date_du, 'YYYY-MM-DD:HH-mm-ss').format(
    'YYYY-MM-DD HH:mm:ss'
  );
  date_au = moment(date_au, 'YYYY-MM-DD:HH-mm-ss').format(
    'YYYY-MM-DD HH:mm:ss'
  );
  //   return res.json({ date_au: date_au, date_du: date_du });
  //checking if the same vendeur has idproduit(passed as query param) in the same date (date_du => date_au)
  const existingVendeur = await VendeurProduit.findAll({
    where: {
      idvendeur: idvendeur,
      idproduit: idproduit,
    },
    include: Produit,
  });
  const dates = existingVendeur.filter((vendeur) => {
    return (
      moment(date_du).isBetween(vendeur.date_du, vendeur.date_au) ||
      moment(date_au).isBetween(vendeur.date_du, vendeur.date_au) ||
      (moment(date_du).isBefore(vendeur.date_du) &&
        moment(date_au).isAfter(vendeur.date_au))
    );
  });
  if (dates.length > 0 && action != 'update') {
    return res.status(400).json({ sucess: true, data: [] });
  }
  //creating logic
  try {
    const newVendeurP = await VendeurProduit.create({
      idproduit: idproduit,
      idvendeur: idvendeur,
      date_du: date_du,
      date_au: date_au,
      lieux: lieux,
      status: status,
      refUpdate: refUpdate,
    });
    res.status(201).json(newVendeurP);
  } catch (error) {
    res.send(error);
  }
};
//update vente
//status current
exports.update = async (req, res) => {
  const vendeurID = req.params.id;
  const { date_du, date_au, lieux } = req.body;
  let fieldsToChange = ['status'];
  for (const [key, value] of Object.entries(req.body)) {
    if (value !== null) fieldsToChange.push(key);
  }
  try {
    await VendeurProduit.update(
      {
        date_du: date_du,
        date_au: date_au,
        lieux: lieux,
        status: 'current',
      },
      {
        where: {
          id: vendeurID,
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

//delete vente
//change status to deleted
exports.deleteUpdate = async (req, res) => {
  const vendeurID = req.params.id;
  try {
    await VendeurProduit.update(
      { status: 'deleted' },
      {
        where: {
          id: vendeurID,
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
  const vendeurID = req.params.id;
  try {
    await VendeurProduit.destroy({
      where: {
        id: vendeurID,
      },
    });
    res.status(204).send('deleted successfully');
  } catch (error) {
    res.send(error);
  }
};

// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
