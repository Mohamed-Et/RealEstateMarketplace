const express = require('express');
const router = express.Router();
const produitCtrl = require('../controllers/produitController');
router.get('/', produitCtrl.getAll);
router.get('/:id', produitCtrl.getByID);
router.get('/refVente/:venteId', produitCtrl.getByVenteID);
router.get('/ref/:refId', produitCtrl.getByRefID);
router.post('/', produitCtrl.create);
router.patch('/:id', produitCtrl.update);
//using patch instead of put because we are only changing one field and not the row in its entirety
router.patch('/delete/:id', produitCtrl.deleteUpdate);
//only for developement
router.delete('/:id', produitCtrl.delete);

module.exports = router;
