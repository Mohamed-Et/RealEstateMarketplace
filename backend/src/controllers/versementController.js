const Versement = require('../models/Versement');
const Recette = require('../models/Recette');
const Op = require('sequelize').Op;
//get all
exports.getAll = async (req, res) => {
  try {
    const versements = await Versement.findAll({
      where: {
        status: {
          [Op.not]: 'deleted',
        },
      },
      include: Recette,
    });
    res.status(200).json(versements);
  } catch (error) {
    res.send(error);
  }
};
//get specific vente by Id vente using ?params=vente
//get specific vente linked with a specific client using ?params=client
exports.getByID = async (req, res) => {
  const param = req.query.param;
  const id = req.params.id;
  if (param === 'versement') {
    try {
      const versement = await Versement.findOne({
        where: { idco_versement: id },
        include: Recette,
      });
      res.status(200).json(versement);
    } catch (error) {
      res.send(error);
    }
  } else if (param === 'recette') {
    try {
      const versement = await Versement.findAll({
        where: { idrecette: id },
        include: Recette,
      });
      res.status(200).json(versement);
    } catch (error) {
      res.send(error);
    }
  }
};
//get by RefUpdateID
exports.getByRefID = async (req, res) => {
  const refUpdate = req.params.refId;
  try {
    const versement = await Versement.findAll({
      where: { refUpdate: refUpdate },
    });
    res.status(200).json(versement);
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
  const { action, currentVersementID, idrecette } = req.query;
  let refUpdate = null;
  let status = 'current';
  if (action === 'update') {
    refUpdate = currentVersementID;
    status = 'old';
  }
  const {
    date_versement,
    date_valeur,
    CIN,
    montant,
    ref_versement,
    ref_rapprochement,
  } = req.body;
  try {
    const newVersement = await Versement.create({
      idrecette: idrecette,
      date_versement: date_versement,
      date_valeur: date_valeur,
      CIN: CIN,
      montant: montant,
      ref_versement: ref_versement,
      ref_rapprochement: ref_rapprochement,
      status: status,
      refUpdate: refUpdate,
    });
    res.status(201).json(newVersement);
  } catch (error) {
    res.send(error);
  }
};
//update vente
//status current
exports.update = async (req, res) => {
  const versementID = req.params.id;
  const { idrecette } = req.query;
  const {
    date_versement,
    date_valeur,
    CIN,
    montant,
    ref_versement,
    ref_rapprochement,
  } = req.body;
  let fieldsToChange = ['status'];
  for (const [key, value] of Object.entries(req.body)) {
    if (value !== null) fieldsToChange.push(key);
  }

  try {
    await Versement.update(
      {
        idrecette: idrecette,
        date_versement: date_versement,
        date_valeur: date_valeur,
        CIN: CIN,
        montant: montant,
        ref_versement: ref_versement,
        ref_rapprochement: ref_rapprochement,
        status: 'current',
      },
      {
        where: {
          idco_versement: versementID,
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
  const versementID = req.params.id;
  // const refDelete = req.query.ref;
  try {
    await Versement.update(
      { status: 'deleted' },
      {
        where: {
          idco_versement: versementID,
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
  const versementId = req.params.id;
  try {
    await Versement.destroy({
      where: {
        idco_versement: versementId,
      },
    });
    res.status(204).send('deleted successfully');
  } catch (error) {
    res.send(error);
  }
};

// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
