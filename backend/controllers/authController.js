const { Utilisateur, Role } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Créer un nouvel utilisateur (signup)
exports.signup = async (req, res) => {
  try {
    const { email, password, nom, prenom, pseudo, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Champs requis manquants' });

    // Vérifie si l'utilisateur existe déjà
    const exist = await Utilisateur.findOne({ where: { email } });
    if (exist) return res.status(409).json({ error: 'Utilisateur déjà existant' });

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const utilisateur = await Utilisateur.create({
      email, password: hashedPassword, nom, prenom, pseudo
    });

    // Attribution du rôle
    let userRole = await Role.findOne({ where: { nom: role || 'utilisateur' } });
    if (!userRole) userRole = await Role.create({ nom: role || 'utilisateur' });
    await utilisateur.addRole(userRole);

    res.status(201).json({ message: 'Inscription réussie', utilisateur: { id: utilisateur.id, email: utilisateur.email, role: userRole.nom } });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
};

// Connexion (login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const utilisateur = await Utilisateur.findOne({ where: { email }, include: { model: Role, as: 'roles' } });
    if (!utilisateur) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const valid = await bcrypt.compare(password, utilisateur.password);
    if (!valid) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    // On prend le premier rôle trouvé (simple, à adapter si multi-rôles réels)
    const role = utilisateur.roles[0]?.nom || 'utilisateur';

    // Création du token JWT
    const token = jwt.sign(
      { id: utilisateur.id, email: utilisateur.email, role },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '2h' }
    );

    res.json({ message: 'Connexion réussie', token, utilisateur: { id: utilisateur.id, email: utilisateur.email, role } });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
};

exports.getAvisEnAttente = async (req, res) => {
  try {
    const avis = await Avis.findAll({ where: { statut: 'en_attente' } });
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.validerAvis = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ error: 'Non trouvé' });
    avis.statut = 'valide';
    await avis.save();
    res.json({ message: "Avis validé", avis });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.refuserAvis = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ error: 'Non trouvé' });
    avis.statut = 'refuse';
    await avis.save();
    res.json({ message: "Avis refusé", avis });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
