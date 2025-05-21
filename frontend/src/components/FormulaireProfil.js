import { useState } from "react";

export default function FormulaireProfil({ emailInitial, onFinish }) {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState(emailInitial || "");
  const [isPassager, setIsPassager] = useState(true);
  const [isChauffeur, setIsChauffeur] = useState(false);
  const [vehicules, setVehicules] = useState([]);
  const [nouveauVehicule, setNouveauVehicule] = useState({
    marque: "",
    modele: "",
    couleur: "",
    plaque: "",
    energie: "",
    annee: "",
  });
  const [error, setError] = useState("");

  function handleAjoutVehicule(e) {
    e.preventDefault();
    if (
      !nouveauVehicule.marque ||
      !nouveauVehicule.modele ||
      !nouveauVehicule.couleur ||
      !nouveauVehicule.plaque ||
      !nouveauVehicule.energie ||
      !nouveauVehicule.annee
    ) {
      setError("Merci de remplir tous les champs du véhicule.");
      return;
    }
    setVehicules([...vehicules, nouveauVehicule]);
    setNouveauVehicule({
      marque: "",
      modele: "",
      couleur: "",
      plaque: "",
      energie: "",
      annee: "",
    });
    setError("");
  }

  function handleValiderProfil(e) {
    e.preventDefault();
    if (!pseudo.trim() || !email.trim()) {
      setError("Merci de renseigner votre pseudo et email.");
      return;
    }
    if (isChauffeur && vehicules.length === 0) {
      setError("Merci d’ajouter au moins un véhicule pour être chauffeur.");
      return;
    }
    // Ici tu pourrais sauvegarder en localStorage ou envoyer au backend :
    localStorage.setItem("profilUser", JSON.stringify({
      pseudo, email, isPassager, isChauffeur, vehicules,
    }));
    localStorage.removeItem("profileToComplete");
    setError("");
    if (onFinish) onFinish();
  }

  return (
    <div className="bg-[#FEFEFD] rounded-2xl shadow p-6 w-full max-w-2xl mx-auto mb-10">
      <h3 className="text-2xl font-bold text-[#185A4E] mb-4 text-center">
        Bienvenue sur EcoRide ! Complétez votre profil
      </h3>
      {error && (
        <div className="text-red-700 text-sm mb-3 font-semibold">{error}</div>
      )}
      <form onSubmit={handleValiderProfil} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={e => setPseudo(e.target.value)}
          className="p-3 rounded-lg border"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-3 rounded-lg border"
          required
        />

        <div className="flex gap-6 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPassager}
              onChange={e => setIsPassager(e.target.checked)}
            />
            Passager
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isChauffeur}
              onChange={e => setIsChauffeur(e.target.checked)}
            />
            Chauffeur
          </label>
        </div>

        {isChauffeur && (
          <div className="bg-[#F4FBF7] rounded p-4 mt-2">
            <h4 className="font-bold mb-2 text-[#185A4E]">Ajoutez vos véhicules</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
              <input value={nouveauVehicule.marque} onChange={e => setNouveauVehicule({ ...nouveauVehicule, marque: e.target.value })} placeholder="Marque" className="p-2 border rounded" />
              <input value={nouveauVehicule.modele} onChange={e => setNouveauVehicule({ ...nouveauVehicule, modele: e.target.value })} placeholder="Modèle" className="p-2 border rounded" />
              <input value={nouveauVehicule.couleur} onChange={e => setNouveauVehicule({ ...nouveauVehicule, couleur: e.target.value })} placeholder="Couleur" className="p-2 border rounded" />
              <input value={nouveauVehicule.plaque} onChange={e => setNouveauVehicule({ ...nouveauVehicule, plaque: e.target.value })} placeholder="Plaque" className="p-2 border rounded" />
              <input value={nouveauVehicule.energie} onChange={e => setNouveauVehicule({ ...nouveauVehicule, energie: e.target.value })} placeholder="Energie utilisée" className="p-2 border rounded" />
              <input value={nouveauVehicule.annee} onChange={e => setNouveauVehicule({ ...nouveauVehicule, annee: e.target.value })} placeholder="Année" className="p-2 border rounded" />
              <button
                type="button"
                onClick={handleAjoutVehicule}
                className="col-span-1 md:col-span-3 bg-green-900 text-white rounded px-4 py-2 font-bold mt-2 hover:bg-green-800"
              >
                Ajouter le véhicule
              </button>
            </div>
            {/* Liste véhicules ajoutés */}
            {vehicules.length > 0 && (
              <ul className="mt-2 space-y-2">
                {vehicules.map((v, i) => (
                  <li key={i} className="bg-white p-2 rounded border">
                    <b>{v.marque}</b> {v.modele} ({v.couleur}), {v.energie}, {v.plaque}, {v.annee}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          type="submit"
          className="bg-green-900 text-white px-8 py-3 rounded-xl font-bold text-lg shadow hover:bg-green-800 transition mt-4"
        >
          Valider mon profil
        </button>
      </form>
    </div>
  );
}
