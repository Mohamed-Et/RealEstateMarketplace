const express = require('express');
const router = express.Router();
const vendeurProduitCtrl = require('../controllers/vendeurProduitController');
router.get('/', vendeurProduitCtrl.getAll);
router.get('/:id', vendeurProduitCtrl.getByID);
router.get('/ref/:refId', vendeurProduitCtrl.getByRefID);
router.post('/', vendeurProduitCtrl.create);
router.patch('/:id', vendeurProduitCtrl.update);
//using patch instead of put because we are only changing one field and not the row in its entirety
router.patch('/delete/:id', vendeurProduitCtrl.deleteUpdate);
//only for developement
router.delete('/:id', vendeurProduitCtrl.delete);
//test
router.get('/:idvendeur/:idproduit', vendeurProduitCtrl.test);

module.exports = router;
