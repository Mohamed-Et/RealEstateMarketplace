const express = require('express');
const router = express.Router();
const consistanceCtrl = require('../controllers/consistanceController');
router.get('/', consistanceCtrl.getAll);
router.get('/:id', consistanceCtrl.getByID);
router.get('/ref/:refId', consistanceCtrl.getByRefID);
router.post('/', consistanceCtrl.create);
router.patch('/:id', consistanceCtrl.update);
//using patch instead of put because we are only changing one field and not the row in its entirety
router.patch('/delete/:id', consistanceCtrl.deleteUpdate);
//only for developement
router.delete('/:id', consistanceCtrl.delete);

module.exports = router;
