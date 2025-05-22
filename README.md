# EcoRide

_EcoRide est une application web de covoiturage écologique réalisée dans le cadre du TP du titre professionnel Développeur Web et Web Mobile (DWWM)._

---

## 🚗 Objectifs

- Faciliter les trajets en covoiturage (mise en relation conducteurs/passagers)
- Promouvoir la mobilité durable et les véhicules écologiques
- Gérer utilisateurs, véhicules, trajets et avis
- Expérience simple et responsive (web/mobile)

---

## 🛠️ Stack technique

- **Frontend** : React.js, HTML5, CSS3
- **Backend** : Node.js + Express.js
- **BDD relationnelle** : MySQL (PlanetScale)
- **BDD NoSQL** : MongoDB (logs, Atlas)
- **Déploiement** : Vercel (frontend) / Render (backend)

---

## 📚 Fonctionnalités principales

- Inscription/connexion sécurisée (JWT)
- Gestion profil utilisateur/conducteur/employé/admin
- Création, recherche et réservation de covoiturages
- Ajout/modification/suppression de voitures
- Système d’avis (dépôt, validation par employé, affichage)
- Tableau de bord admin (statistiques, création employés, suspension)
- Documentation API (Swagger/Markdown)
- Logs d’activité (MongoDB)

---

## 📁 Organisation du projet

ecoride-app/
├── backend/ # Node.js, Express, modèles, routes, controllers
├── frontend/ # React, composants/pages
├── docs/ # Documentation, API, guides
├── maquette/ # Maquettes Figma/PDF
└── README.md

---

## 🚀 Démo

- **Backend (Render)** : _à compléter_
- **Frontend (Vercel)** : _à compléter_
- **API docs** : _à compléter_

---

## 💻 Installation locale

**1. Cloner le projet**

   bash
git clone https://github.com/BlocSpore/ecoride-app.git
cd ecoride-app

**2. Backend**

cd backend
npm install
cp .env.example .env     # Adapter variables si besoin
npm start                # http://localhost:5001

**3. Frontend**

cd ../frontend
npm install
npm run dev              # http://localhost:3000

**4. Base de données**

MySQL : créer la base, adapter .env
MongoDB : cluster Atlas/local, ajuster MONGO_URI dans .env

🔗 Liens utiles

GitHub
Trello 
Maquettes : à compléter (PDF/Figma)
🔒 Accès admin (test)

Login : admin
Mot de passe : aze
(Tester via /api/auth/login ou interface admin)
📑 Documentation API

Voir /docs ou Swagger (lien à compléter)
Export PDF disponible en annexe du TP
🤝 Remerciements

Projet réalisé dans le cadre du TP DWWM – Merci à Studi.
