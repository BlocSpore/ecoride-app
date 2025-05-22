EcoRide

EcoRide est une application web de covoiturage écologique réalisée dans le cadre du TP du titre professionnel Développeur Web et Web Mobile (DWWM).

🚗 Objectifs

Faciliter les trajets en covoiturage (mise en relation conducteurs et passagers)
Promouvoir la mobilité durable et l’utilisation de véhicules écologiques
Gérer conducteurs, passagers, véhicules, trajets et avis de façon sécurisée
Offrir une expérience simple, rapide et responsive (web/mobile)
🛠️ Stack technique

Frontend :
React.js (responsive, SPA)
HTML5, CSS3 (styled-components, Tailwind ou CSS modules)
Backend :
Node.js + Express.js
BDD relationnelle :
MySQL (PlanetScale ou Railway pour le cloud)
BDD NoSQL :
MongoDB (Atlas – gestion des logs)
Déploiement :
Frontend : Vercel ([à compléter])
Backend : Render ([à compléter])
🧭 Fonctionnalités principales

Inscription/connexion sécurisée (authentification JWT)
Gestion de profil (utilisateur, conducteur, employé, admin)
Ajout, modification, suppression de voitures
Création, recherche et réservation de covoiturages
Système d’avis : dépôt, validation/refus par employé, affichage public/privé
Tableau de bord administrateur : statistiques, gestion des comptes, création employés
Logs d’activité (stockés en MongoDB)
Documentation API intégrée (Swagger ou Markdown)
🗂️ Organisation du projet

ecoride-app/
│
├── backend/   # Node.js, Express, modèles, routes, contrôleurs
├── frontend/  # React, composants, pages, hooks
├── docs/      # Documentation, API, guides
├── maquette/  # Maquettes Figma/PDF
├── components/
├── pages/
└── README.md  # Ce fichier
🚀 Démonstration en ligne

Backend Render : [à compléter]
Frontend Vercel : [à compléter]
API docs : [à compléter, lien Swagger ou PDF]
💻 Installation locale

1. Cloner le dépôt
git clone https://github.com/BlocSpore/ecoride-app.git
cd ecoride-app
2. Installer les dépendances
Backend

cd backend
npm install
cp .env.example .env      # Adapter les variables selon ta config
npm start                 # Lancer le backend sur http://localhost:5001
Frontend

cd ../frontend
npm install
npm run dev               # Lancer le frontend sur http://localhost:3000
3. Configurer la base de données
MySQL : Créer la base, adapter les variables d’environnement (DB_HOST, etc.)
MongoDB : Créer un cluster (MongoDB Atlas ou local), ajuster MONGO_URI dans le .env
📋 Liens utiles

GitHub du projet : https://github.com/BlocSpore/ecoride-app
Board Trello : https://trello.com/b/DZMAsaN4/ecoride-tp-dwwm-mai-2025
Maquettes Figma : [à compléter/lien PDF]
🔒 Accès administrateur

Login : admin
Mot de passe : aze
(Pour tester les fonctionnalités d’administration, cf. /api/auth/login et dashboard admin.)
📑 Documentation API

La documentation complète de l’API est disponible dans docs/
(Swagger : [à compléter] ou PDF à joindre en annexe du TP)
🤝 Contributions et remerciements

Ce projet a été réalisé dans le cadre du TP DWWM, encadré par [Nom du formateur/école].
Merci à tous les contributeurs et beta-testeurs.
