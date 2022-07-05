const express = require('express');
const router = express.Router();
const recetteCtrl = require('../controllers/recetteController');
router.get('/', recetteCtrl.getAll);
router.get('/:id', recetteCtrl.getByID);
router.get('/ref/:refId', recetteCtrl.getByRefID);
router.post('/', recetteCtrl.create);
router.patch('/:id', recetteCtrl.update);
//using patch instead of put because we are only changing one field and not the row in its entirety
router.patch('/delete/:id', recetteCtrl.deleteUpdate);
//only for developement
router.delete('/:id', recetteCtrl.delete);

module.exports = router;
