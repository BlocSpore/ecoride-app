const Log = require('../models/log');

exports.createLog = async (req, res) => {
  try {
    const log = await Log.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: 'Erreur création log' });
  }
};

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur logs' });
  }
};
