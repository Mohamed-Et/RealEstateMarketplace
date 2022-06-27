const express = require('express');
const router = express.Router();
const venteCtrl = require('../controllers/venteController');
router.get('/', venteCtrl.getAll);
router.get('/:id', venteCtrl.getByID);
router.get('/ref/:refId', venteCtrl.getByRefID);
router.post('/', venteCtrl.create);
router.patch('/:id', venteCtrl.update);
//using patch instead of put because we are only changing one field and not the row in its entirety
router.patch('/delete/:id', venteCtrl.deleteUpdate);
//only for developement
router.delete('/:id', venteCtrl.delete);

module.exports = router;
