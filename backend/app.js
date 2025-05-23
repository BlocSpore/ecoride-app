require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./models');
// const mongoose = require('mongoose');  // << désactivé
const PORT = process.env.PORT || 5001;

// Connexion MongoDB — DÉSACTIVÉE POUR LE DÉPLOIEMENT
// if (process.env.MONGO_URI) {
//   mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('✅ Connexion MongoDB réussie'))
//     .catch(err => console.error('❌ Erreur connexion MongoDB :', err));
// } else {
//   console.log("🔔 Aucune URI MongoDB fournie (logs désactivés)");
// }

// Middleware global pour parser le JSON
app.use(express.json());

// Import et utilisation des routes
const utilisateurRoutes = require('./routes/utilisateur');
const voitureRoutes = require('./routes/voiture');
const marqueRoutes = require('./routes/marque');
const covoiturageRoutes = require('./routes/covoiturage');
const avisRoutes = require('./routes/avis');
const roleRoutes = require('./routes/role');
const authRoutes = require('./routes/auth');
const logRoutes = require('./routes/log');

// Organisation claire des endpoints API
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/voitures', voitureRoutes);
app.use('/api/marques', marqueRoutes);
app.use('/api/covoiturages', covoiturageRoutes);
app.use('/api/avis', avisRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);

// (Optionnel) Route de test pour healthcheck rapide
app.get('/api/ping', (req, res) => {
  res.json({ message: 'EcoRide backend opérationnel 🟢' });
});

db.sequelize.authenticate()
  .then(() => console.log('✅ Connexion à MySQL réussie'))
  .catch(err => console.error('❌ Erreur de connexion MySQL :', err));

// En dev, sync auto (en prod, migrer !)
db.sequelize.sync({ alter: true })
  .then(() => console.log('✅ Modèles MySQL synchronisés'))
  .catch(err => console.error('❌ Erreur de synchronisation des modèles MySQL :', err));

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 EcoRide backend running on port ${PORT}`);
});
