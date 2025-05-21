import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Connexion() {
  const [isRegister, setIsRegister] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [showMdp, setShowMdp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleConnexion(e) {
    e.preventDefault();
    setError(""); // reset error
    if (email.toLowerCase() === "admin@ecoride.com" && mdp === "123") {
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else if (email.toLowerCase() === "employe@ecoride.com" && mdp === "123") {
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("role", "employe");
      navigate("/employe");
    } else if (email && mdp) {
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("role", "user");
      navigate("/user-espace");  
    } else {
      setError("Email ou mot de passe invalide");
    }
  }
  
  function handleInscription(e) {
    e.preventDefault();
    setError(""); // reset error
    if (email.toLowerCase() === "admin@ecoride.com" && mdp === "123") {
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else if (email.toLowerCase() === "employe@ecoride.com" && mdp === "123") {
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("role", "employe");
      navigate("/employe");
    } else if (email && mdp) {
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("role", "user");
      localStorage.setItem("profileToComplete", "true");
      navigate("/user-espace");   
    } else {
      setError("Merci de remplir tous les champs");
    }
  }

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center bg-[#F8F3EC] py-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#185A4E] mb-6 text-center">
          {isRegister ? "Créer un compte" : "Connexion"}
        </h2>
        {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
        <form onSubmit={isRegister ? handleInscription : handleConnexion} className="flex flex-col gap-6">
          {isRegister && (
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              required
              className="p-3 rounded-lg border"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="p-3 rounded-lg border"
          />
          <div className="relative">
            <input
              type={showMdp ? "text" : "password"}
              placeholder="Mot de passe"
              value={mdp}
              onChange={e => setMdp(e.target.value)}
              required
              className="p-3 rounded-lg border w-full"
            />
            <button
              type="button"
              onClick={() => setShowMdp(v => !v)}
              className="absolute right-2 top-2 text-xs text-gray-500 hover:text-gray-800"
              tabIndex={-1}
            >
              {showMdp ? "Masquer" : "Afficher"}
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-900 text-white px-8 py-3 rounded-xl font-bold text-lg shadow hover:bg-green-800 transition"
          >
            {isRegister ? "Créer un compte" : "Se connecter"}
          </button>
        </form>
        <div className="text-center mt-4">
          {isRegister ? (
            <span>
              Déjà inscrit ?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-green-900 underline hover:text-green-800"
              >
                Se connecter
              </button>
            </span>
          ) : (
            <span>
              Pas encore de compte ?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-green-900 underline hover:text-green-800"
              >
                Créer un compte
              </button>
            </span>
          )}
        </div>
        {/* Bloc visible examinateur */}
        <div className="mt-6 p-4 border rounded-lg bg-[#F9F6F0] text-xs text-left text-[#185A4E] shadow-inner">
          <b>Comptes de test :</b>
          <ul className="mt-1 space-y-1">
            <li>
              <b>Administrateur</b> : admin@ecoride.com / <b>123</b>
            </li>
            <li>
              <b>Employé</b> : employe@ecoride.com / <b>123</b>
            </li>
            <li>
              <b>Utilisateur</b> : créez un compte avec l’adresse de votre choix
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
