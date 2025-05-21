import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Rendu étoiles
function renderStars(note) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= Math.round(note) ? "text-yellow-500" : "text-gray-300"}>★</span>
    );
  }
  return stars;
}

// Mock data
const avisMock = [
  { utilisateur: "Julie", note: 5, commentaire: "Chauffeur au top ! Très agréable et ponctuel." },
  { utilisateur: "Samir", note: 4, commentaire: "Voiture propre, conduite prudente." },
  { utilisateur: "Cécile", note: 5, commentaire: "Trajet parfait, à refaire !" },
];

const allTrajets = [
  {
    id: 1,
    depart: "Besançon",
    arrivee: "Montbéliard",
    date: "17 juin 2025",
    heure: "9h00",
    places: 3,
    prix: 7,
    voiture: {
      marque: "Renault",
      modele: "Zoe",
      couleur: "Blanc",
      plaque: "AA-123-BB",
      energie: "Électrique",
    },
    electrique: true,
    conducteur: "Alice",
    commentaire: "Pause possible à Valdahon.",
    duree: 0.8,
    note: 4.7,
    preferences: {
      fumeur: false,
      animaux: false,
      musique: true,
      message: "Merci de respecter la propreté du véhicule et de ne pas manger à bord.",
    },
    avis: avisMock,
  },
  {
    id: 2,
    depart: "Besançon",
    arrivee: "Montbéliard",
    date: "17 juin 2025",
    heure: "13h30",
    places: 2,
    prix: 8,
    voiture: {
      marque: "Peugeot",
      modele: "208",
      couleur: "Gris",
      plaque: "BB-456-CC",
      energie: "Essence",
    },
    electrique: false,
    conducteur: "Sophie",
    commentaire: "Véhicule spacieux, petit chien accepté.",
    duree: 1,
    note: 4.2,
    preferences: {
      fumeur: false,
      animaux: true,
      musique: true,
      message: "J'accepte les animaux de petite taille uniquement.",
    },
    avis: [
      { utilisateur: "Léo", note: 4, commentaire: "Conduite fluide, sympa." },
      { utilisateur: "Anna", note: 5, commentaire: "Très bon accueil, je recommande !" },
    ],
  },
  {
    id: 3,
    depart: "Valdahon",
    arrivee: "Montbéliard",
    date: "18 juin 2025",
    heure: "8h00",
    places: 1,
    prix: 6,
    voiture: {
      marque: "Tesla",
      modele: "Model 3",
      couleur: "Rouge",
      plaque: "CC-789-DD",
      energie: "Électrique",
    },
    electrique: true,
    conducteur: "Lucas",
    commentaire: "Uniquement passagers non-fumeurs.",
    duree: 1.3,
    note: 5,
    preferences: {
      fumeur: false,
      animaux: false,
      musique: false,
      message: "Pas de discussion pendant la conduite, merci de votre compréhension.",
    },
    avis: [
      { utilisateur: "Claire", note: 5, commentaire: "Ponctuel et voiture incroyable !" },
    ],
  },
];

export default function ResultatsRecherche() {
  const [filtreEco, setFiltreEco] = useState(false);
  const [filtrePrix, setFiltrePrix] = useState(100);
  const [filtreNote, setFiltreNote] = useState(1);
  const [filtreDuree, setFiltreDuree] = useState(10);
  const [editPrix, setEditPrix] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [editDuree, setEditDuree] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  // Fonctions conversion durée "1h10"
  function hoursToDisplay(val) {
    const heures = Math.floor(val);
    const minutes = Math.round((val - heures) * 60);
    return `${heures}h${minutes === 0 ? "" : minutes}`;
  }
  function displayToHours(str) {
    if (!str.includes("h")) return Number(str);
    const [h, m] = str.split("h");
    return Number(h) + (Number(m) ? Number(m) / 60 : 0);
  }

  // Filtres cumulés
  const trajets = allTrajets.filter((trajet) => {
    if (filtreEco && !trajet.electrique) return false;
    if (filtrePrix && trajet.prix > filtrePrix) return false;
    if (filtreNote && trajet.note < filtreNote) return false;
    if (filtreDuree && trajet.duree > filtreDuree) return false;
    return true;
  });

  // Réinit filtres
  function resetFiltres() {
    setFiltreEco(false);
    setFiltrePrix(100);
    setFiltreNote(1);
    setFiltreDuree(10);
  }

  return (
    <section className="min-h-[90vh] bg-[#F8F3EC] flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-2xl w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-[#185A4E] mb-6 text-center">
          Résultats de la recherche
        </h2>

        {/* Filtres */}
        <div className="flex flex-col md:flex-row gap-8 mb-8 w-full">
          {/* Trajets écologiques */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filtreEco}
              onChange={() => setFiltreEco((v) => !v)}
              className="accent-green-700"
            />
            <span className="text-[#185A4E] font-semibold">Trajets écologiques</span>
          </label>
          {/* Slider prix */}
          <div className="flex flex-col items-start w-full md:w-1/3">
            <label className="text-[#185A4E] font-semibold mb-1">Prix max (€)</label>
            <div className="flex items-center gap-3 w-full">
              <input
                type="range"
                min={1}
                max={100}
                value={filtrePrix}
                onChange={e => setFiltrePrix(Number(e.target.value))}
                className="w-full accent-green-900"
              />
              {editPrix ? (
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={filtrePrix}
                  onChange={e => setFiltrePrix(Number(e.target.value))}
                  onBlur={() => setEditPrix(false)}
                  className="ml-2 text-lg font-bold border rounded px-2 w-16"
                  autoFocus
                />
              ) : (
                <span
                  className="ml-2 text-lg font-bold cursor-pointer"
                  onClick={() => setEditPrix(true)}
                  title="Cliquez pour saisir au clavier"
                >
                  {filtrePrix} €
                </span>
              )}
            </div>
          </div>
          {/* Slider note */}
          <div className="flex flex-col items-start w-full md:w-1/3">
            <label className="text-[#185A4E] font-semibold mb-1">Note min.</label>
            <div className="flex items-center gap-3 w-full">
              <input
                type="range"
                min={1}
                max={5}
                step={0.1}
                value={filtreNote}
                onChange={e => setFiltreNote(Number(e.target.value))}
                className="w-full accent-green-900"
              />
              {editNote ? (
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  value={filtreNote}
                  onChange={e => setFiltreNote(Number(e.target.value))}
                  onBlur={() => setEditNote(false)}
                  className="ml-2 text-lg font-bold border rounded px-2 w-16"
                  autoFocus
                />
              ) : (
                <span
                  className="ml-2 text-lg font-bold cursor-pointer"
                  onClick={() => setEditNote(true)}
                  title="Cliquez pour saisir au clavier"
                >
                  {filtreNote} ★
                </span>
              )}
            </div>
          </div>
          {/* Slider durée */}
          <div className="flex flex-col items-start w-full md:w-1/3">
            <label className="text-[#185A4E] font-semibold mb-1">Durée max (h)</label>
            <div className="flex items-center gap-3 w-full">
              <input
                type="range"
                min={0.5}
                max={10}
                step={1 / 6}
                value={filtreDuree}
                onChange={e => setFiltreDuree(Number(e.target.value))}
                className="w-full accent-green-900"
              />
              {editDuree ? (
                <input
                  type="text"
                  pattern="\d+h(\d{2})?"
                  value={hoursToDisplay(filtreDuree)}
                  onChange={e => {
                    let val = e.target.value;
                    if (!val.match(/^\d{1,2}h(\d{1,2})?$/)) return;
                    setFiltreDuree(displayToHours(val));
                  }}
                  onBlur={() => setEditDuree(false)}
                  className="ml-2 text-lg font-bold border rounded px-2 w-16"
                  autoFocus
                />
              ) : (
                <span
                  className="ml-2 text-lg font-bold cursor-pointer"
                  onClick={() => setEditDuree(true)}
                  title="Cliquez pour saisir au clavier, ex: 2h20"
                >
                  {hoursToDisplay(filtreDuree)}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Bouton réinitialiser */}
        <button
          onClick={resetFiltres}
          className="mb-8 px-4 py-2 bg-gray-200 rounded-lg text-[#185A4E] hover:bg-gray-300"
        >
          Réinitialiser les filtres
        </button>
        {/* Affichage des trajets */}
        {trajets.length === 0 ? (
          <div className="bg-[#FFF9F1] text-[#B45309] rounded-xl p-6 text-center mb-8 w-full">
            <p className="text-lg font-semibold mb-2">
              Aucun trajet trouvé pour vos critères.
            </p>
            <p>
              Essayez de modifier vos filtres ou votre recherche !
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6">
            {trajets.map((trajet) => (
              <div
                key={trajet.id}
                className={`bg-[#F3FCF6] rounded-2xl p-6 shadow transition-all duration-300
                  ${expanded === trajet.id ? "scale-105 border-2 border-green-900" : ""}
                `}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-bold text-[#185A4E] text-lg">
                      {trajet.depart} <span className="mx-2">→</span> {trajet.arrivee}
                    </div>
                    <div className="text-[#1D3B2A] text-sm">
                      {trajet.date} à {trajet.heure} • {trajet.places} places • Durée {hoursToDisplay(trajet.duree)}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-green-900">{trajet.prix} €</span>
                      {trajet.electrique && (
                        <span className="text-green-700 flex items-center text-sm font-semibold bg-green-100 px-2 py-1 rounded-lg ml-2">
                          <span className="mr-1">⚡</span>
                          Écologique
                        </span>
                      )}
                    </div>
                    {/* Ajout conducteur et note */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-[#185A4E]">
                        Conducteur : {trajet.conducteur}
                      </span>
                      <span className="ml-2 text-yellow-500">{renderStars(trajet.note)}</span>
                      <span className="ml-1 text-sm text-[#185A4E] font-bold">{trajet.note.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end mt-4 md:mt-0 gap-2">
                    <button
                      className="bg-green-900 text-white px-6 py-2 rounded-xl font-bold shadow hover:bg-green-800 transition"
                      onClick={() => {
                        if (!localStorage.getItem("isConnected")) {
                          navigate("/connexion");
                        } else {
                          alert("Réservation prise en compte ! 🚗");
                        }
                      }}
                    >
                      Réserver
                    </button>
                    <button
                      onClick={() => setExpanded(expanded === trajet.id ? null : trajet.id)}
                      className="text-green-900 underline hover:text-green-700 mt-2"
                    >
                      {expanded === trajet.id ? "Masquer les détails" : "Détail trajet"}
                    </button>
                  </div>
                </div>
                {/* Bloc détails avancé */}
                {expanded === trajet.id && (
                  <div className="mt-4 p-4 rounded-xl bg-white shadow-inner border text-[#185A4E]">
                    <div className="mb-2">
                      <span className="font-semibold">Véhicule :</span> {trajet.voiture.marque} {trajet.voiture.modele} ({trajet.voiture.couleur})
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Plaque :</span> {trajet.voiture.plaque}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Énergie :</span> {trajet.voiture.energie}
                    </div>
                    {/* Conducteur + note ici aussi */}
                    <div className="mb-2">
                      <span className="font-semibold">Conducteur :</span> {trajet.conducteur}
                      <span className="ml-3 text-yellow-500">{renderStars(trajet.note)}</span>
                      <span className="ml-1 text-[#185A4E] font-bold">{trajet.note.toFixed(1)}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Préférences :</span>
                      <ul className="list-disc pl-5">
                        <li>{trajet.preferences.fumeur ? "Fumeurs acceptés" : "Non-fumeur"}</li>
                        <li>{trajet.preferences.animaux ? "Animaux acceptés" : "Pas d'animaux"}</li>
                        <li>{trajet.preferences.musique ? "Musique autorisée" : "Musique interdite"}</li>
                      </ul>
                    </div>
                    <div className="mb-2 italic">
                      <span className="font-semibold">Message conducteur :</span> {trajet.preferences.message}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Avis des passagers :</span>
                      <ul className="mt-2 space-y-1">
                        {trajet.avis.map((a, i) => (
                          <li key={i} className="bg-[#F3FCF6] p-2 rounded">
                            <span className="font-bold">{a.utilisateur}</span> : {a.commentaire} {" "}
                            <span className="text-yellow-500">{renderStars(a.note)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
