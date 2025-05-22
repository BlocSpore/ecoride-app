const { Utilisateur, Covoiturage, Role } = require('../models');
const bcrypt = require('bcryptjs');

// Lister tous les utilisateurs
exports.getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll({ attributes: { exclude: ['password'] } });
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Afficher un utilisateur par id
exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!utilisateur) return res.status(404).json({ error: 'Non trouvé' });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer un utilisateur (admin uniquement)
exports.createUtilisateur = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const utilisateur = await Utilisateur.create(req.body);
    res.status(201).json(utilisateur);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création' });
  }
};

// Modifier un utilisateur (admin)
exports.updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ error: 'Non trouvé' });
    await utilisateur.update(req.body);
    res.json(utilisateur);
  } catch (err) {
    res.status(400).json({ error: 'Erreur modification' });
  }
};

// Supprimer un utilisateur (admin)
exports.deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ error: 'Non trouvé' });
    await utilisateur.destroy();
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
};

// Espace perso (GET)
exports.getMe = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!utilisateur) return res.status(404).json({ error: 'Non trouvé' });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Modifier ses propres infos (PUT)
exports.updateMe = async (req, res) => {
  try {
    const { email, password, ...autresChamps } = req.body;
    const utilisateur = await Utilisateur.findByPk(req.user.id);
    if (!utilisateur) return res.status(404).json({ error: 'Non trouvé' });
    await utilisateur.update(autresChamps);
    res.json(utilisateur);
  } catch (err) {
    res.status(400).json({ error: 'Erreur modification' });
  }
};

// Créer un employé (admin)
exports.creerEmploye = async (req, res) => {
  try {
    const { email, password, nom, prenom, pseudo } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Champs requis manquants' });
    const exist = await Utilisateur.findOne({ where: { email } });
    if (exist) return res.status(409).json({ error: 'Employé déjà existant' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const employe = await Utilisateur.create({ email, password: hashedPassword, nom, prenom, pseudo });
    let employeRole = await Role.findOne({ where: { nom: 'employe' } });
    if (!employeRole) employeRole = await Role.create({ nom: 'employe' });
    await employe.addRole(employeRole);
    res.status(201).json({ message: 'Employé créé', employe: { id: employe.id, email: employe.email } });
  } catch (err) {
    res.status(500).json({ error: 'Erreur création', details: err.message });
  }
};

// Suspendre un utilisateur (admin)
exports.suspendreUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ error: 'Non trouvé' });
    utilisateur.suspendu = true;
    await utilisateur.save();
    res.json({ message: 'Utilisateur suspendu' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suspension', details: err.message });
  }
};

// Statistiques (admin)
exports.getStats = async (req, res) => {
  try {
    const nbCovoiturages = await Covoiturage.count();
    // Ajoute ici d'autres stats si besoin
    res.json({ nbCovoiturages });
  } catch (err) {
    res.status(500).json({ error: 'Erreur stats', details: err.message });
  }
};
