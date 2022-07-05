const express = require('express');
const router = express.Router();
const associerCtrl = require('../controllers/associerController');
router.get('/', associerCtrl.getAll);
router.get('/:id', associerCtrl.getByID);
router.post('/:idvente/:idclient', associerCtrl.create);
router.patch('/:id', associerCtrl.deleteUpdate);
//only for developement
router.delete('/:id', associerCtrl.delete);

module.exports = router;
