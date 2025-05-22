const express = require('express');
const router = express.Router();
const voitureController = require('../controllers/voitureController');
const { verifyToken } = require('../middleware/auth');

// CRUD voitures par user connecté
router.post('/me', verifyToken, voitureController.addMyCar);
router.get('/me', verifyToken, voitureController.getMyCars);
router.put('/me/:id', verifyToken, voitureController.updateMyCar);
router.delete('/me/:id', verifyToken, voitureController.deleteMyCar);

router.get('/', voitureController.getAllVoitures);
router.get('/:id', voitureController.getVoitureById);
router.post('/', voitureController.createVoiture);
router.put('/:id', voitureController.updateVoiture);
router.delete('/:id', voitureController.deleteVoiture);

module.exports = router;
