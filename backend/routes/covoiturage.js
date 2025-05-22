const express = require('express');
const router = express.Router();
const covoiturageController = require('../controllers/covoiturageController');
const { verifyToken } = require('../middleware/auth');

// --- Routes fixes en premier ---
router.get('/search', covoiturageController.searchCovoiturages);
router.get('/mes-reservations', verifyToken, covoiturageController.getMesReservations);
router.get('/problemes', verifyToken, covoiturageController.getProblemes);
router.post('/:id/reserver', verifyToken, covoiturageController.reserver);

// --- CRUD standard ---
router.get('/', covoiturageController.getAllCovoiturages);
router.post('/', verifyToken, covoiturageController.createCovoiturage);

// --- Routes dynamiques à la fin ---
router.get('/:id', covoiturageController.getCovoiturageById);
router.put('/:id', verifyToken, covoiturageController.updateCovoiturage);
router.delete('/:id', verifyToken, covoiturageController.deleteCovoiturage);

module.exports = router;
