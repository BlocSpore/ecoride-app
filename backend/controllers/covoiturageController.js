const { Covoiturage, Utilisateur } = require('../models');

// Lister tous les covoiturages
exports.getAllCovoiturages = async (req, res) => {
  try {
    const covoiturages = await Covoiturage.findAll();
    res.json(covoiturages);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Lister covoiturage par ID
exports.getCovoiturageById = async (req, res) => {
  try {
    const covoiturage = await Covoiturage.findByPk(req.params.id);
    if (!covoiturage) return res.status(404).json({ error: 'Non trouvé' });
    res.json(covoiturage);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer un covoiturage
exports.createCovoiturage = async (req, res) => {
  try {
    const { lieu_depart, lieu_arrivee, date_depart, date_arrivee, prix, places } = req.body;
    const covoiturage = await Covoiturage.create({ lieu_depart, lieu_arrivee, date_depart, date_arrivee, prix, places });
    res.status(201).json(covoiturage);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création', details: err.message });
  }
};

// Modifier un covoiturage
exports.updateCovoiturage = async (req, res) => {
  try {
    const covoiturage = await Covoiturage.findByPk(req.params.id);
    if (!covoiturage) return res.status(404).json({ error: 'Non trouvé' });
    await covoiturage.update(req.body);
    res.json(covoiturage);
  } catch (err) {
    res.status(400).json({ error: 'Erreur modification', details: err.message });
  }
};

// Supprimer un covoiturage
exports.deleteCovoiturage = async (req, res) => {
  try {
    const covoiturage = await Covoiturage.findByPk(req.params.id);
    if (!covoiturage) return res.status(404).json({ error: 'Non trouvé' });
    await covoiturage.destroy();
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression', details: err.message });
  }
};

// Recherche de covoiturages
exports.searchCovoiturages = async (req, res) => {
  try {
    const { lieu_depart, lieu_arrivee, date_depart } = req.query;
    const where = {};
    if (lieu_depart) where.lieu_depart = lieu_depart;
    if (lieu_arrivee) where.lieu_arrivee = lieu_arrivee;
    if (date_depart) where.date_depart = date_depart;
    const trajets = await Covoiturage.findAll({ where });
    res.json(trajets);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Réserver un covoiturage
exports.reserver = async (req, res) => {
  try {
    const covoiturage = await Covoiturage.findByPk(req.params.id);
    if (!covoiturage) return res.status(404).json({ error: 'Covoiturage non trouvé' });

    // Ajoute l'utilisateur comme participant
    if (covoiturage.addParticipant) {
      await covoiturage.addParticipant(req.user.id);
    } else {
      // Si addParticipant n'existe pas (erreur d'asso), ajoute une log d'erreur
      return res.status(500).json({ error: "Association non configurée pour les participants." });
    }
    res.json({ message: 'Réservation validée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur réservation', details: err.message });
  }
};

// Voir mes réservations
exports.getMesReservations = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.user.id, {
      include: [{
        model: Covoiturage,
        as: 'covoiturages'
      }]
    });
    res.json(utilisateur.covoiturages);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Voir les covoiturages problématiques (ex : à valider par un employé)
exports.getProblemes = async (req, res) => {
  try {
    const problemes = await Covoiturage.findAll({ where: { statut: 'probleme' } });
    res.json(problemes);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
