const Vente = require('../models/Vente');
const Client = require('../models/Client');
const Produit = require('../models/Produit');
const Op = require('sequelize').Op;
//get all
exports.getAll = async (req, res) => {
  try {
    const produits = await Produit.findAll({
      where: {
        status: {
          [Op.not]: 'deleted',
        },
      },
      include: Vente,
    });
    res.status(200).json(produits);
  } catch (error) {
    res.send(error);
  }
};
//get specific vente by Id vente using ?params=vente
//get specific vente linked with a specific client using ?params=client
exports.getByID = async (req, res) => {
  const idProduit = req.params.id;
  try {
    const produit = await Produit.findOne({
      where: { idco_produit: idProduit },
      include: Vente,
    });
    res.status(200).json(produit);
  } catch (error) {
    res.send(error);
  }
};
//get by VenteID
exports.getByVenteID = async (req, res) => {
  const venteID = req.params.venteId;
  try {
    const produit = await Produit.findOne({
      include: [
        {
          model: Vente,
          where: { idco_vente: venteID },
        },
      ],
    });
    res.status(200).json(produit);
  } catch (error) {
    res.send(error);
  }
};
//get by RefUpdateID
exports.getByRefID = async (req, res) => {
  const refUpdate = req.params.refId;
  try {
    const produit = await Produit.findAll({ where: { refUpdate: refUpdate } });
    res.status(200).json(produit);
  } catch (error) {
    res.send(error);
  }
};
//add new client or duplicate client
exports.create = async (req, res) => {
  const { action, currentProduitID } = req.query;
  let refUpdate = null;
  let status = 'current';
  if (action === 'update') {
    refUpdate = currentProduitID;
    status = 'old';
  }
  const {
    num_produit,
    id_consistance,
    titre_foncier,
    voie,
    orientation,
    superficie,
    prix_m2,
    prix,
    statut_produit,
    date,
    par,
    situation,
  } = req.body;
  try {
    const newProduit = await Produit.create({
      num_produit: num_produit,
      id_consistance: id_consistance,
      titre_foncier: titre_foncier,
      voie: voie,
      orientation: orientation,
      superficie: superficie,
      prix_m2: prix_m2,
      prix: prix,
      statut_produit: statut_produit,
      date: date,
      par: par,
      situation: situation,
      status: status,
      refUpdate: refUpdate,
    });
    res.status(201).json(newProduit);
  } catch (error) {
    res.send(error);
  }
};
//update vente
//status current
exports.update = async (req, res) => {
  const produitID = req.params.id;
  const {
    num_produit,
    id_consistance,
    titre_foncier,
    voie,
    orientation,
    superficie,
    prix_m2,
    prix,
    statut_produit,
    date,
    par,
    situation,
  } = req.body;
  let fieldsToChange = ['status'];
  for (const [key, value] of Object.entries(req.body)) {
    if (value !== null) fieldsToChange.push(key);
  }

  try {
    await Produit.update(
      {
        num_produit: num_produit,
        id_consistance: id_consistance,
        titre_foncier: titre_foncier,
        voie: voie,
        orientation: orientation,
        superficie: superficie,
        prix_m2: prix_m2,
        prix: prix,
        statut_produit: statut_produit,
        date: date,
        par: par,
        situation: situation,
        status: 'current',
      },
      {
        where: {
          idco_produit: produitID,
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
  const produitID = req.params.id;
  try {
    await Produit.update(
      { status: 'deleted' },
      {
        where: {
          idco_produit: produitID,
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
  const produitID = req.params.id;
  try {
    await Produit.destroy({
      where: {
        idco_produit: produitID,
      },
    });
    res.status(204).send('deleted successfully');
  } catch (error) {
    res.send(error);
  }
};

// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
