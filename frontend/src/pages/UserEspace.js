import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Croix SVG pour la suppression de véhicule
function CloseIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      width={18}
      height={18}
      className={className}
      aria-label="Supprimer"
    >
      <path d="M4.22 4.22a.75.75 0 011.06 0L8 6.94l2.72-2.72a.75.75 0 111.06 1.06L9.06 8l2.72 2.72a.75.75 0 11-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 11-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 010-1.06z" />
    </svg>
  );
}

// Fonction étoile pour la note
function renderStars(note) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= Math.round(note) ? "text-yellow-500" : "text-gray-300"}>★</span>
    );
  }
  return stars;
}

export default function UserEspace() {
  const navigate = useNavigate();

  // ---- État "profil à compléter" ----
  const [profileToComplete, setProfileToComplete] = useState(
    localStorage.getItem("profileToComplete") === "true"
  );

  // ---- USER/VEHICULES en localStorage ----
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userProfile")) || {
      pseudo: "",
      email: "",
      password: "",
      note: 4.7,
      statut: { passager: true, chauffeur: false },
    }
  );

  const [vehicules, setVehicules] = useState(() =>
    JSON.parse(localStorage.getItem("userVehicules")) || []
  );

  // ---- Sauvegarde à chaque modif ----
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem("userVehicules", JSON.stringify(vehicules));
  }, [vehicules]);

  // Mot de passe édition
  const [editPwd, setEditPwd] = useState(false);
  const [pwdValue, setPwdValue] = useState(user.password);

  // Préférences
  const [preferences, setPreferences] = useState([
    "Non fumeur",
    "Pas d'animaux",
  ]);
  const [newPref, setNewPref] = useState("");

  // Formulaire véhicule
  const [nouveauVehicule, setNouveauVehicule] = useState({
    marque: "",
    modele: "",
    couleur: "",
    plaque: "",
    energie: "",
    annee: "",
  });

  // Redirection/déconnexion
  function handleDeconnexion() {
    localStorage.removeItem("isConnected");
    localStorage.removeItem("role");
    navigate("/connexion");
  }

  // ---- Bloc profil à compléter à la première connexion ----
  function handleCompleteProfile(e) {
    e.preventDefault();
    if (
      !user.pseudo.trim() ||
      !user.email.trim() ||
      !user.password.trim() ||
      (user.statut.chauffeur && vehicules.length === 0)
    ) {
      alert("Merci de remplir tous les champs nécessaires et d’ajouter un véhicule si vous êtes chauffeur.");
      return;
    }
    setProfileToComplete(false);
    localStorage.setItem("profileToComplete", "false");
    alert("Profil complété !");
  }

  // Mot de passe édition
  function handlePwdChange(e) {
    e.preventDefault();
    setUser({ ...user, password: pwdValue });
    setEditPwd(false);
  }

  // Ajout véhicule
  function handleAjoutVehicule(e) {
    e.preventDefault();
    setVehicules([...vehicules, nouveauVehicule]);
    setNouveauVehicule({ marque: "", modele: "", couleur: "", plaque: "", energie: "", annee: "" });
  }

  // Supprimer véhicule
  function handleSupprimeVehicule(index) {
    setVehicules(vehicules.filter((_, i) => i !== index));
  }

  // Saisie voyage (mock)
  function handleSaisieVoyage(e) {
    e.preventDefault();
    alert("Voyage publié !");
  }

  // ---- Mock covoiturages, historique, avis ----
  const covoiturages = [
    { statut: "Terminé", role: "Passager", depart: "Lille", arrivee: "Paris", date: "19/04/2023", heure: "08:00", aValider: true },
    { statut: "En cours", role: "Conducteur", depart: "Lille", arrivee: "Paris", date: "20/04/2023", heure: "08:00", enCours: true },
    { statut: "A venir", role: "Passager", depart: "Lille", arrivee: "Vesoul", date: "24/04/2024", heure: "08:00", annule: false },
    { statut: "A venir", role: "Conducteur", depart: "Lille", arrivee: "Paris", date: "24/04/2024", heure: "08:00", annule: false },
    { statut: "A venir", role: "Passager", depart: "Lille", arrivee: "Vesoul", date: "24/04/2024", heure: "08:00", annule: true },
  ];
  const historique = [
    { depart: "Lille", arrivee: "Paris", date: "24/04/2023", heure: "08:00", role: "Conducteur" },
  ];
  const avis = [
    { user: "Mike.T", note: 5, commentaire: "Chauffeur au top!" },
  ];

  // Ordre d’affichage covoiturages
  const covoitToValidate = covoiturages.filter(c => c.aValider);
  const covoitEnCours = covoiturages.filter(c => c.enCours);
  const covoitAVenir = covoiturages.filter(c => c.statut === "A venir" && !c.annule);
  const covoitAnnules = covoiturages.filter(c => c.annule);

  // ---- Composant principal ----
  return (
    <section className="min-h-[90vh] bg-[#F8F3EC] flex flex-col items-center py-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        {/* ---- Bloc profil à compléter ---- */}
        {profileToComplete && (
          <form onSubmit={handleCompleteProfile} className="mb-8 p-4 rounded-xl border-2 border-yellow-400 bg-yellow-50">
            <h3 className="text-xl font-bold mb-2 text-yellow-800">Complétez votre profil !</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                placeholder="Pseudo"
                value={user.pseudo}
                onChange={e => setUser({ ...user, pseudo: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                required
                type="email"
                placeholder="E-mail"
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                required
                type="password"
                placeholder="Mot de passe"
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
                className="p-2 border rounded"
              />
              <span className="flex items-center">
                <label className="mr-3">
                  <input
                    type="checkbox"
                    checked={user.statut.passager}
                    onChange={() => setUser(u => ({ ...u, statut: { ...u.statut, passager: !u.statut.passager } }))}
                  /> Passager
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={user.statut.chauffeur}
                    onChange={() => setUser(u => ({ ...u, statut: { ...u.statut, chauffeur: !u.statut.chauffeur } }))}
                  /> Chauffeur
                </label>
              </span>
            </div>
            {/* Si chauffeur, au moins un véhicule */}
            {user.statut.chauffeur && (
              <div className="mt-4">
                <b>Ajoutez au moins un véhicule :</b>
                <div className="flex flex-wrap gap-2 mb-2 mt-2">
                  {vehicules.map((v, i) => (
                    <span
                      key={i}
                      className="bg-green-100 px-3 py-1 rounded shadow flex items-center gap-2"
                    >
                      {v.marque} {v.modele}
                      <button
                        type="button"
                        onClick={() => handleSupprimeVehicule(i)}
                        className="ml-1 text-red-600 hover:text-red-900"
                        style={{ background: "none", border: "none", padding: 0, lineHeight: 1 }}
                        title="Supprimer ce véhicule"
                        aria-label="Supprimer"
                      >
                        <CloseIcon />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                  <input required value={nouveauVehicule.marque} onChange={e => setNouveauVehicule({ ...nouveauVehicule, marque: e.target.value })} placeholder="Marque" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.modele} onChange={e => setNouveauVehicule({ ...nouveauVehicule, modele: e.target.value })} placeholder="Modèle" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.couleur} onChange={e => setNouveauVehicule({ ...nouveauVehicule, couleur: e.target.value })} placeholder="Couleur" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.plaque} onChange={e => setNouveauVehicule({ ...nouveauVehicule, plaque: e.target.value })} placeholder="Plaque" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.energie} onChange={e => setNouveauVehicule({ ...nouveauVehicule, energie: e.target.value })} placeholder="Energie" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.annee} onChange={e => setNouveauVehicule({ ...nouveauVehicule, annee: e.target.value })} placeholder="Année" className="p-2 border rounded" />
                  <button
                    type="button"
                    onClick={handleAjoutVehicule}
                    className="col-span-1 md:col-span-6 bg-green-900 text-white rounded px-4 py-2 font-bold hover:bg-green-800"
                  >Ajouter</button>
                </div>
              </div>
            )}
            <button type="submit" className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded font-bold">Enregistrer mon profil</button>
          </form>
        )}

        {/* ---- Infos utilisateur ---- */}
        {!profileToComplete && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#185A4E] mb-2 flex items-center gap-2">
                  {user.pseudo || <span className="italic text-gray-400">Pseudo</span>} 
                  <span className="ml-3 text-yellow-500">{renderStars(user.note)}</span>
                  <span className="ml-1 text-[#185A4E] font-bold">{user.note?.toFixed(1) ?? ""}</span>
                </h3>
                <div className="flex flex-col gap-1 text-[#1D3B2A]">
                  <span><b>E-mail :</b> {user.email}</span>
                  <span>
                    <b>Mot de passe :</b>{" "}
                    {editPwd ? (
                      <form onSubmit={handlePwdChange} className="inline">
                        <input
                          type="password"
                          value={pwdValue}
                          onChange={e => setPwdValue(e.target.value)}
                          className="p-1 border rounded w-32"
                          autoFocus
                        />
                        <button type="submit" className="ml-2 px-2 py-1 rounded bg-green-900 text-white">Valider</button>
                        <button type="button" className="ml-2 px-2 py-1 rounded bg-gray-200" onClick={() => setEditPwd(false)}>Annuler</button>
                      </form>
                    ) : (
                      <>
                        {"*".repeat(user.password?.length || 8)}
                        <button className="ml-2 text-sm underline text-green-700" onClick={() => setEditPwd(true)}>
                          Changer
                        </button>
                      </>
                    )}
                  </span>
                  <span>
                    <b>Statut :</b>
                    <label className="ml-3">
                      <input
                        type="checkbox"
                        checked={user.statut.passager}
                        onChange={() =>
                          setUser(u => ({
                            ...u,
                            statut: { ...u.statut, passager: !u.statut.passager }
                          }))
                        }
                      /> Passager
                    </label>
                    <label className="ml-3">
                      <input
                        type="checkbox"
                        checked={user.statut.chauffeur}
                        onChange={() => {
                          if (user.statut.chauffeur && vehicules.length === 0) {
                            alert("Vous devez avoir au moins un véhicule pour rester chauffeur.");
                            return;
                          }
                          setUser(u => ({
                            ...u,
                            statut: { ...u.statut, chauffeur: !u.statut.chauffeur }
                          }))
                        }}
                      /> Chauffeur
                    </label>
                  </span>
                  {!user.statut.chauffeur && (
                    <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 text-sm rounded">
                      <b>Vous êtes actuellement passager uniquement.</b>
                      <br />Pour proposer un trajet, cochez la case “Chauffeur”.
                    </div>
                  )}
                </div>
              </div>
              <button onClick={handleDeconnexion} className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-800">
                Déconnexion
              </button>
            </div>

            {/* Préférences */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#185A4E] mb-2">Mes préférences</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {preferences.map((pref, i) => (
                  <span key={i} className="flex items-center bg-green-100 text-green-900 px-3 py-1 rounded-full shadow-sm">
                    {pref}
                    <button
                      onClick={() => setPreferences(preferences.filter((_, idx) => idx !== i))}
                      className="ml-2 text-red-500 hover:text-red-700 font-bold"
                      title="Supprimer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (newPref.trim() && !preferences.includes(newPref.trim())) {
                    setPreferences([...preferences, newPref.trim()]);
                    setNewPref("");
                  }
                }}
                className="flex gap-2 mt-2"
              >
                <input
                  value={newPref}
                  onChange={e => setNewPref(e.target.value)}
                  placeholder="Ajouter une préférence…"
                  className="p-2 border rounded w-52"
                  maxLength={32}
                />
                <button type="submit" className="bg-green-900 text-white rounded px-4 py-2 font-bold hover:bg-green-800">Ajouter</button>
              </form>
            </div>

            {/* Véhicules (affiché seulement si chauffeur) */}
            {user.statut.chauffeur && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#185A4E] mb-2">Mes véhicules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicules.map((v, i) => (
                    <div key={i} className="bg-[#F3FCF6] p-3 rounded shadow relative flex flex-col">
                      <button
                        onClick={() => handleSupprimeVehicule(i)}
                        title="Supprimer ce véhicule"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        style={{ background: "none", border: "none", padding: 0, lineHeight: 1 }}
                      >
                        <CloseIcon />
                      </button>
                      <div><b>Marque :</b> {v.marque}</div>
                      <div><b>Modèle :</b> {v.modele}</div>
                      <div><b>Couleur :</b> {v.couleur}</div>
                      <div><b>Plaque :</b> {v.plaque}</div>
                      <div><b>Energie :</b> {v.energie}</div>
                      <div><b>Année :</b> {v.annee}</div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAjoutVehicule} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input required value={nouveauVehicule.marque} onChange={e => setNouveauVehicule({ ...nouveauVehicule, marque: e.target.value })} placeholder="Marque" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.modele} onChange={e => setNouveauVehicule({ ...nouveauVehicule, modele: e.target.value })} placeholder="Modèle" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.couleur} onChange={e => setNouveauVehicule({ ...nouveauVehicule, couleur: e.target.value })} placeholder="Couleur" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.plaque} onChange={e => setNouveauVehicule({ ...nouveauVehicule, plaque: e.target.value })} placeholder="Plaque" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.energie} onChange={e => setNouveauVehicule({ ...nouveauVehicule, energie: e.target.value })} placeholder="Energie utilisée" className="p-2 border rounded" />
                  <input required value={nouveauVehicule.annee} onChange={e => setNouveauVehicule({ ...nouveauVehicule, annee: e.target.value })} placeholder="Année" className="p-2 border rounded" />
                  <button type="submit" className="col-span-1 md:col-span-3 bg-green-900 text-white rounded px-4 py-2 font-bold mt-2 hover:bg-green-800">Ajouter un véhicule</button>
                </form>
              </div>
            )}

            {/* Saisir un voyage */}
            {user.statut.chauffeur && (
              <div className="mb-8">
              <h3 className="text-xl font-bold text-[#185A4E] mb-2">Saisir un voyage</h3>
              <form onSubmit={handleSaisieVoyage} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input required placeholder="Ville de départ" className="p-2 border rounded" />
                <input required placeholder="Destination" className="p-2 border rounded" />
                <input required type="date" placeholder="Date du voyage" className="p-2 border rounded" />
                <input required type="time" placeholder="Heure de départ" className="p-2 border rounded" />
                <select required className="p-2 border rounded">
                  <option>Sélectionner un véhicule</option>
                  {vehicules.map((v, i) => (
                    <option key={i}>{v.marque} {v.modele} ({v.couleur})</option>
                  ))}
                </select>
                <input required type="number" placeholder="Nombre de places" className="p-2 border rounded" min={1} max={7} />
                <input required type="number" placeholder="Prix de la place (€)" className="p-2 border rounded" min={1} />
                {/* Champ pour le temps estimé */}
                <input required type="text" placeholder="Temps estimé (ex: 1h20)" className="p-2 border rounded" />
                {/* Message du conducteur */}
                <input required type="text" placeholder="Message pour les passagers" className="p-2 border rounded" maxLength={120} />
                <button type="submit" className="col-span-1 md:col-span-3 bg-green-900 text-white rounded px-4 py-2 font-bold mt-2 hover:bg-green-800">Publier le voyage</button>
              </form>
            </div>
            )}

            {/* Mes covoiturages */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#185A4E] mb-2">Mes covoiturages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[...covoitToValidate, ...covoitEnCours, ...covoitAVenir, ...covoitAnnules].map((c, i) => (
                  <div key={i} className="p-2 bg-[#F3FCF6] rounded">
                    <div><b>{c.depart}</b> → <b>{c.arrivee}</b></div>
                    <div>{c.date} {c.heure} <span className="ml-2">{c.role}</span></div>
                    {c.aValider && <button className="ml-2 bg-green-800 text-white px-2 py-1 rounded">Soumettre un avis</button>}
                    {c.enCours && <button className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded">Arrivée à destination</button>}
                    {c.statut === "A venir" && !c.annule && (
                      <button className="ml-2 bg-red-500 text-white px-2 py-1 rounded">Annuler</button>
                    )}
                    {c.annule && <span className="text-red-600">Annulé</span>}
                    {c.valide && <span className="text-green-600">Validé</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Historique */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#185A4E] mb-2">Historique</h3>
              <div>
                {historique.map((h, i) => (
                  <div key={i} className="p-2 text-[#1D3B2A]">
                    {h.depart} → {h.arrivee} le {h.date} à {h.heure} <span className="ml-2">{h.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mes avis */}
            <div>
              <h3 className="text-xl font-bold text-[#185A4E] mb-2">Mes avis</h3>
              <div>
                {avis.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 p-2">
                    <span className="text-2xl">☺️</span>
                    <span className="font-bold">{a.user}</span>
                    <span className="text-yellow-500">{'⭐️'.repeat(a.note)}</span>
                    <span className="ml-2">{a.commentaire}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
