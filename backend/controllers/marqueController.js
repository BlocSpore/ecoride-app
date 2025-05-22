const { Marque } = require('../models');

exports.getAllMarques = async (req, res) => {
  try {
    const marques = await Marque.findAll();
    res.json(marques);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getMarqueById = async (req, res) => {
  try {
    const marque = await Marque.findByPk(req.params.id);
    if (!marque) return res.status(404).json({ error: 'Non trouvé' });
    res.json(marque);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createMarque = async (req, res) => {
  try {
    const marque = await Marque.create(req.body);
    res.status(201).json(marque);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création' });
  }
};

exports.updateMarque = async (req, res) => {
  try {
    const marque = await Marque.findByPk(req.params.id);
    if (!marque) return res.status(404).json({ error: 'Non trouvé' });
    await marque.update(req.body);
    res.json(marque);
  } catch (err) {
    res.status(400).json({ error: 'Erreur modification' });
  }
};

exports.deleteMarque = async (req, res) => {
  try {
    const marque = await Marque.findByPk(req.params.id);
    if (!marque) return res.status(404).json({ error: 'Non trouvé' });
    await marque.destroy();
    res.json({ message: 'Supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
};
