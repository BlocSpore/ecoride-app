const { Role } = require('../models');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Non trouvé' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Non trouvé' });
    await role.update(req.body);
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: 'Erreur modification' });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Non trouvé' });
    await role.destroy();
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
};
