const { Voiture } = require('../models');

exports.getAllVoitures = async (req, res) => {
  try {
    const voitures = await Voiture.findAll();
    res.json(voitures);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getVoitureById = async (req, res) => {
  try {
    const voiture = await Voiture.findByPk(req.params.id);
    if (!voiture) return res.status(404).json({ error: 'Non trouvé' });
    res.json(voiture);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createVoiture = async (req, res) => {
  try {
    const voiture = await Voiture.create(req.body);
    res.status(201).json(voiture);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création' });
  }
};

exports.updateVoiture = async (req, res) => {
  try {
    const voiture = await Voiture.findByPk(req.params.id);
    if (!voiture) return res.status(404).json({ error: 'Non trouvé' });
    await voiture.update(req.body);
    res.json(voiture);
  } catch (err) {
    res.status(400).json({ error: 'Erreur modification' });
  }
};

exports.deleteVoiture = async (req, res) => {
  try {
    const voiture = await Voiture.findByPk(req.params.id);
    if (!voiture) return res.status(404).json({ error: 'Non trouvé' });
    await voiture.destroy();
    res.json({ message: 'Supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
};

exports.addMyCar = async (req, res) => {
  try {
    const voiture = await Voiture.create({
      ...req.body,
      utilisateur_id: req.user.id
    });
    res.status(201).json(voiture);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création' });
  }
};

exports.getMyCars = async (req, res) => {
  try {
    const voitures = await Voiture.findAll({ where: { utilisateur_id: req.user.id } });
    res.json(voitures);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.updateMyCar = async (req, res) => {
  try {
    const voiture = await Voiture.findOne({ where: { id: req.params.id, utilisateur_id: req.user.id } });
    if (!voiture) return res.status(404).json({ error: 'Non trouvé' });
    await voiture.update(req.body);
    res.json(voiture);
  } catch (err) {
    res.status(400).json({ error: 'Erreur modification' });
  }
};

exports.deleteMyCar = async (req, res) => {
  try {
    const voiture = await Voiture.findOne({ where: { id: req.params.id, utilisateur_id: req.user.id } });
    if (!voiture) return res.status(404).json({ error: 'Non trouvé' });
    await voiture.destroy();
    res.json({ message: 'Supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
};
