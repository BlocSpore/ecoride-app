const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  utilisateurId: String, // ou Number si tu préfères
  action: String,
  date: { type: Date, default: Date.now },
  details: Object // champ générique
});

module.exports = mongoose.model('Log', logSchema);
