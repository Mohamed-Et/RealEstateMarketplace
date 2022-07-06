const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateurController');
router.get('/', utilisateurCtrl.getAll);
router.get('/:id', utilisateurCtrl.getByID);
router.post('/', utilisateurCtrl.register);
router.post('/login', utilisateurCtrl.login);
router.patch('/:id', utilisateurCtrl.update);
//using patch instead of put because we are only changing one field and not the row in its entirety
router.patch('/delete/:id', utilisateurCtrl.deleteUpdate);
//only for developement
router.delete('/:id', utilisateurCtrl.delete);

module.exports = router;
