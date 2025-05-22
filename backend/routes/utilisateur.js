const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');



router.get('/me', verifyToken, utilisateurController.getMe);
router.put('/me', verifyToken, utilisateurController.updateMe);

router.get('/stats', verifyToken, isAdmin, utilisateurController.getStats);
router.post('/creer-employe', verifyToken, isAdmin, utilisateurController.creerEmploye);

router.get('/', utilisateurController.getAllUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.post('/', utilisateurController.createUtilisateur);
router.put('/:id', utilisateurController.updateUtilisateur);
router.delete('/:id', utilisateurController.deleteUtilisateur);
router.post('/:id/suspendre', verifyToken, isAdmin, utilisateurController.suspendreUtilisateur);


module.exports = router;
