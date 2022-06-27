const Vente = require('../models/Vente');
const Client = require('../models/Client');
const Op = require('sequelize').Op;
//get all
exports.getAll = async (req, res) => {
  try {
    const ventes = await Vente.findAll({
      where: {
        status: {
          [Op.not]: 'deleted',
        },
      },
      include: Client,
    });
    res.status(200).json(ventes);
  } catch (error) {
    res.send(error);
  }
};
//get specific vente by Id vente using ?params=vente
//get specific vente linked with a specific client using ?params=client
exports.getByID = async (req, res) => {
  const param = req.query.param;
  const id = req.params.id;
  if (param === 'vente') {
    try {
      const vente = await Vente.findOne({
        where: { idco_vente: id },
        include: Client,
      });
      res.status(200).json(vente);
    } catch (error) {
      res.send(error);
    }
  } else if (param === 'client') {
    try {
      const vente = await Vente.findOne({
        where: { idclient: id },
        include: Client,
      });
      res.status(200).json(vente);
    } catch (error) {
      res.send(error);
    }
  }
};
//get by RefUpdateID
exports.getByRefID = async (req, res) => {
  const refUpdate = req.params.refId;
  try {
    const vente = await Vente.findAll({ where: { refUpdate: refUpdate } });
    res.status(200).json(vente);
  } catch (error) {
    res.send(error);
  }
};
//add new client
//using specifying only idclient in params : ?idclient=someID
//or duplicate client
//using ?action=update&currentVenteId=TheVenteIDToReference&idclient=someID
//!this will duplicate a row wiht refupdate referncing the current vente and status to old
exports.create = async (req, res) => {
  const { action, currentVenteID, idclient } = req.query;
  let refUpdate = null;
  let status = 'current';
  if (action === 'update') {
    refUpdate = currentVenteID;
    status = 'old';
  }
  const {
    idproduit,
    date,
    promotion,
    prix_vente,
    condition,
    statut_vente,
    notaire,
    credit,
    accord,
    datecre,
    par,
    id_adm,
    date_adm,
    observation,
    id_vendeur,
  } = req.body;
  try {
    const newVente = await Vente.create({
      idclient: idclient,
      idproduit: idproduit,
      date: date,
      promotion: promotion,
      prix_vente: prix_vente,
      condition: condition,
      statut_vente: statut_vente,
      notaire: notaire,
      credit: credit,
      accord: accord,
      datecre: datecre,
      par: par,
      id_adm: id_adm,
      date_adm: date_adm,
      observation: observation,
      id_vendeur: id_vendeur,
      status: status,
      refUpdate: refUpdate,
    });
    res.status(201).json(newVente);
  } catch (error) {
    res.send(error);
  }
};
//update vente
//status current
exports.update = async (req, res) => {
  const venteID = req.params.id;
  const {
    idclient,
    idproduit,
    date,
    promotion,
    prix_vente,
    condition,
    statut_vente,
    notaire,
    credit,
    accord,
    datecre,
    par,
    id_adm,
    date_adm,
    observation,
    id_vendeur,
  } = req.body;
  let fieldsToChange = ['status'];
  for (const [key, value] of Object.entries(req.body)) {
    if (value !== null) fieldsToChange.push(key);
  }

  try {
    await Vente.update(
      {
        idclient: idclient,
        idproduit: idproduit,
        date: date,
        promotion: promotion,
        prix_vente: prix_vente,
        condition: condition,
        statut_vente: statut_vente,
        notaire: notaire,
        credit: credit,
        accord: accord,
        datecre: datecre,
        par: par,
        id_adm: id_adm,
        date_adm: date_adm,
        observation: observation,
        id_vendeur: id_vendeur,
        status: 'current',
      },
      {
        where: {
          idco_vente: venteID,
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
  const venteID = req.params.id;
  // const refDelete = req.query.ref;
  try {
    await Vente.update(
      { status: 'deleted' },
      {
        where: {
          idco_vente: venteID,
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
  const venteID = req.params.id;
  try {
    await Vente.destroy({
      where: {
        idco_vente: venteID,
      },
    });
    res.status(204).send('deleted successfully');
  } catch (error) {
    res.send(error);
  }
};

// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
