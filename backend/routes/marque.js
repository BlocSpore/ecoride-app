const express = require('express');
const router = express.Router();
const marqueController = require('../controllers/marqueController');

router.get('/', marqueController.getAllMarques);
router.get('/:id', marqueController.getMarqueById);
router.post('/', marqueController.createMarque);
router.put('/:id', marqueController.updateMarque);
router.delete('/:id', marqueController.deleteMarque);

module.exports = router;
