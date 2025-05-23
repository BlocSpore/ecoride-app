# EcoRide

_EcoRide est une application web de covoiturage écologique réalisée dans le cadre du TP du titre professionnel Développeur Web et Web Mobile (DWWM)._

---

## 🚀 Liens principaux

- 🌐 **Frontend (Vercel)** : [https://ecoride-app-git-main-blocspores-projects.vercel.app](https://ecoride-app-git-main-blocspores-projects.vercel.app)
- 🖥️ **Backend (Render)** : [https://ecoride-5hll.onrender.com](https://ecoride-5hll.onrender.com)
- 📑 **Documentation API (HackMD)** : [https://hackmd.io/@cPrmPOz0S1CIcqPbIQbn8g/S1ZpmMpWlg](https://hackmd.io/@cPrmPOz0S1CIcqPbIQbn8g/S1ZpmMpWlg)
- 📦 **GitHub** : [https://github.com/BlocSpore/ecoride-app](https://github.com/BlocSpore/ecoride-app)
- 🗂️ **Trello (Kanban projet)** : [https://trello.com/b/DZMAsaN4/ecoride-tp-dwwm-mai-2025](https://trello.com/b/DZMAsaN4/ecoride-tp-dwwm-mai-2025)
- 🎨 **Maquettes

- [Maquette Figma interactive (prototype, accès public)](https://www.figma.com/proto/IHIe4ZZjHtBE9gLgOySUur/EcoRide-maquette--Copy-?node-id=1087-41&t=z0sx1FI3SfOjA5fE-1)
- [Maquette PDF (GitHub)](./maquette/ecoride-maquette.pdf)
- 
---

**Lien direct API test** :  
[https://ecoride-5hll.onrender.com/api/ping](https://ecoride-5hll.onrender.com/api/ping)

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
- Documentation API (voir ci-dessus)
- Logs d’activité (MongoDB)

---

## 📁 Organisation du projet

```plaintext
ecoride-app/
├── backend/    # Node.js, Express, modèles, routes, controllers
├── frontend/   # React, composants/pages
├── docs/       # Documentation, API, guides
├── maquette/   # Maquettes Figma/PDF
└── README.md
💻 Installation locale

1. Cloner le projet
git clone https://github.com/BlocSpore/ecoride-app.git
cd ecoride-app
2. Backend
cd backend
npm install
cp .env.example .env     # Adapter variables si besoin
npm start                # http://localhost:5001
3. Frontend
cd ../frontend
npm install
npm run dev              # http://localhost:3000
4. Base de données
MySQL : créer la base, adapter .env
MongoDB : cluster Atlas/local, ajuster MONGO_URI dans .env
🔒 Accès administrateur (test)

Login : admin
Mot de passe : aze
(Tester via /api/auth/login ou interface admin)
📑 Documentation API

Documentation complète (HackMD, accès public)
Voir aussi le dossier /docs ou Swagger (lien à compléter)
Export PDF disponible en annexe du TP
🤝 Remerciements

Projet réalisé dans le cadre du TP DWWM – Merci à Studi, au formateur, et aux beta-testeurs.

📄 Licence

MIT
