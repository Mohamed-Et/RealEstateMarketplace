const express = require('express');
const router = express.Router();
const versementCtrl = require('../controllers/versementController');
router.get('/', versementCtrl.getAll);
router.get('/:id', versementCtrl.getByID);
router.get('/ref/:refId', versementCtrl.getByRefID);
router.post('/', versementCtrl.create);
router.patch('/:id', versementCtrl.update);
//using patch instead of put because we are only changing one field and not the row in its entirety
router.patch('/delete/:id', versementCtrl.deleteUpdate);
//only for developement
router.delete('/:id', versementCtrl.delete);

module.exports = router;
