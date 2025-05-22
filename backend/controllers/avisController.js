const { Avis, Utilisateur, Covoiturage } = require('../models');

exports.getAllAvis = async (req, res) => {
  try {
    const avis = await Avis.findAll();
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getAvisById = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ error: 'Non trouvé' });
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createAvis = async (req, res) => {
  try {
    const avis = await Avis.create(req.body);
    res.status(201).json(avis);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création' });
  }
};

exports.updateAvis = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ error: 'Non trouvé' });
    await avis.update(req.body);
    res.json(avis);
  } catch (err) {
    res.status(400).json({ error: 'Erreur modification' });
  }
};

exports.deleteAvis = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ error: 'Non trouvé' });
    await avis.destroy();
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
};

exports.leaveAvis = async (req, res) => {
  try {
    const { covoiturage_id, commentaire, note } = req.body;
    // Vérifier que l'utilisateur a participé à ce covoiturage
    const utilisateur = await Utilisateur.findByPk(req.user.id);
    const covos = await utilisateur.getCovoiturages({ where: { id: covoiturage_id } });
    if (!covos.length) return res.status(403).json({ error: "Vous n'avez pas participé à ce covoiturage" });

    // Vérifier qu'il n'a pas déjà laissé un avis
    const exist = await Avis.findOne({ where: { utilisateur_id: req.user.id, covoiturage_id } });
    if (exist) return res.status(409).json({ error: "Vous avez déjà laissé un avis" });

    const avis = await Avis.create({
      utilisateur_id: req.user.id,
      covoiturage_id,
      commentaire,
      note,
      statut: 'en_attente'
    });
    res.status(201).json(avis);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création', details: err.message });
  }
};

exports.getAvisRediges = async (req, res) => {
  try {
    const avis = await Avis.findAll({ where: { utilisateur_id: req.user.id } });
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getAvisRecus = async (req, res) => {
  try {
    const covos = await Covoiturage.findAll({ where: { conducteur_id: req.user.id } });
    const covoIds = covos.map(c => c.id);
    const avis = await Avis.findAll({ where: { covoiturage_id: covoIds } });
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
};


exports.getAvisPublics = async (req, res) => {
  try {
    const avis = await Avis.findAll({ where: { statut: 'valide' } });
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Afficher tous les avis en attente (pour l'employé)
exports.getAvisEnAttente = async (req, res) => {
  try {
    const avis = await Avis.findAll({ where: { statut: 'en_attente' } });
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Valider un avis (employé)
exports.validerAvis = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ error: 'Avis non trouvé' });
    avis.statut = 'valide';
    await avis.save();
    res.json({ message: 'Avis validé', avis });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Refuser un avis (employé)
exports.refuserAvis = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ error: 'Avis non trouvé' });
    avis.statut = 'refuse';
    await avis.save();
    res.json({ message: 'Avis refusé', avis });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
