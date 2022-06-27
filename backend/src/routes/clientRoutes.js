const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/clientController');
router.get('/', clientCtrl.getAll);
router.get('/:id', clientCtrl.getByID);
router.get('/refVente/:venteId', clientCtrl.getByVenteID);
router.get('/ref/:refId', clientCtrl.getByRefID);
router.post('/', clientCtrl.create);
router.patch('/:id', clientCtrl.update);
//using patch instead of put because we are only changing one field and not the row in its entirety
router.patch('/delete/:id', clientCtrl.deleteUpdate);
//only for developement
router.delete('/:id', clientCtrl.delete);

module.exports = router;
