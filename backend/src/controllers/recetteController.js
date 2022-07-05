const Vente = require('../models/Vente');
const Recette = require('../models/Recette');
const Op = require('sequelize').Op;
//get all
exports.getAll = async (req, res) => {
  try {
    const recettes = await Recette.findAll({
      where: {
        status: {
          [Op.not]: 'deleted',
        },
      },
      include: Vente,
    });
    res.status(200).json(recettes);
  } catch (error) {
    res.send(error);
  }
};
//get specific vente by Id vente using ?params=vente
//get specific vente linked with a specific client using ?params=client
exports.getByID = async (req, res) => {
  const param = req.query.param;
  const id = req.params.id;
  if (param === 'recette') {
    try {
      const recette = await Recette.findOne({
        where: { idco_recette: id },
        include: Vente,
      });
      res.status(200).json(recette);
    } catch (error) {
      res.send(error);
    }
  } else if (param === 'vente') {
    try {
      const recette = await Recette.findAll({
        where: { idvente: id },
        include: Vente,
      });
      res.status(200).json(recette);
    } catch (error) {
      res.send(error);
    }
  }
};
//get by RefUpdateID
exports.getByRefID = async (req, res) => {
  const refUpdate = req.params.refId;
  try {
    const recette = await Recette.findAll({ where: { refUpdate: refUpdate } });
    res.status(200).json(recette);
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
  const { action, currentRecetteID, idvente } = req.query;
  let refUpdate = null;
  let status = 'current';
  if (action === 'update') {
    refUpdate = currentRecetteID;
    status = 'old';
  }
  const {
    date_av,
    date_limite,
    num_av,
    montant,
    emise_par,
    emise_le,
    rib,
    recu,
  } = req.body;
  try {
    const newRecette = await Recette.create({
      idvente: idvente,
      date_av: date_av,
      date_limite: date_limite,
      num_av: num_av,
      montant: montant,
      emise_par: emise_par,
      emise_le: emise_le,
      rib: rib,
      recu: recu,
      status: status,
      refUpdate: refUpdate,
    });
    res.status(201).json(newRecette);
  } catch (error) {
    res.send(error);
  }
};
//update vente
//status current
exports.update = async (req, res) => {
  const recetteID = req.params.id;
  const { idvente } = req.query;
  const {
    date_av,
    date_limite,
    num_av,
    montant,
    emise_par,
    emise_le,
    rib,
    recu,
  } = req.body;
  let fieldsToChange = ['status'];
  for (const [key, value] of Object.entries(req.body)) {
    if (value !== null) fieldsToChange.push(key);
  }

  try {
    await Recette.update(
      {
        idvente: idvente,
        date_av: date_av,
        date_limite: date_limite,
        num_av: num_av,
        montant: montant,
        emise_par: emise_par,
        emise_le: emise_le,
        rib: rib,
        recu: recu,
        status: 'current',
      },
      {
        where: {
          idco_recette: recetteID,
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
  const recetteId = req.params.id;
  // const refDelete = req.query.ref;
  try {
    await Recette.update(
      { status: 'deleted' },
      {
        where: {
          idco_recette: recetteId,
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
  const recetteID = req.params.id;
  try {
    await Recette.destroy({
      where: {
        idco_recette: recetteID,
      },
    });
    res.status(204).send('deleted successfully');
  } catch (error) {
    res.send(error);
  }
};

// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
