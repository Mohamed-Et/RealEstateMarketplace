const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/clientController');
router.get('/', clientCtrl.getAll);
router.get('/:id', clientCtrl.getByID);
router.post('/', clientCtrl.create);
router.patch('/:id', clientCtrl.update);
//using patch instead of put because we are only changing one field and not the row in its entirety
router.patch('/delete/:id', clientCtrl.delete);

module.exports = router;
