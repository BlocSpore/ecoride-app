const express = require('express');
const router = express.Router();
const avisController = require('../controllers/avisController');
const { verifyToken, isEmploye } = require('../middleware/auth');

router.get('/publics', avisController.getAvisPublics);
router.get('/en-attente', verifyToken, isEmploye, avisController.getAvisEnAttente);
router.get('/mes-avis-rediges', verifyToken, avisController.getAvisRediges);
router.get('/mes-avis-recus', verifyToken, avisController.getAvisRecus);

router.get('/:id', avisController.getAvisById);
router.post('/', avisController.createAvis);
router.put('/:id', avisController.updateAvis);
router.delete('/:id', avisController.deleteAvis);

router.post('/leave', verifyToken, avisController.leaveAvis);
router.post('/:id/valider', verifyToken, isEmploye, avisController.validerAvis);
router.post('/:id/refuser', verifyToken, isEmploye, avisController.refuserAvis);

module.exports = router;
