import { useState } from "react";

export default function Admin() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  function handleCreateEmploye(e) {
    e.preventDefault();
    // Simulation ajout d’employé (à remplacer par un POST API plus tard)
    setConfirmation(`Employé "${pseudo}" créé avec succès !`);
    setPseudo("");
    setEmail("");
    setPassword("");
  }

  return (
    <section className="min-h-[90vh] bg-[#F8F3EC] flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#185A4E] mb-8 text-center">
          Espace Administrateur
        </h2>
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#185A4E] mb-4">Créer un compte employé</h3>
          <form className="flex flex-col md:flex-row gap-4 mb-6" onSubmit={handleCreateEmploye}>
  <input
    className="p-2 rounded-lg border w-full md:w-1/4"
    placeholder="Pseudo"
    value={pseudo}
    onChange={e => {
      setPseudo(e.target.value);
      setConfirmation(null);
    }}
    required
  />
  <input
    className="p-2 rounded-lg border w-full md:w-1/4"
    placeholder="Email"
    type="email"
    value={email}
    onChange={e => {
      setEmail(e.target.value);
      setConfirmation(null);
    }}
    required
  />
  <input
    className="p-2 rounded-lg border w-full md:w-1/4"
    placeholder="Mot de passe"
    type="password"
    value={password}
    onChange={e => {
      setPassword(e.target.value);
      setConfirmation(null);
    }}
    required
  />
  <button className="bg-green-700 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-900 transition">
    Créer
  </button>
</form>

          {confirmation && (
            <div className="text-green-700 font-semibold mt-2">{confirmation}</div>
          )}
        </div>

        {/* Le reste de la page ne change pas */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#185A4E] mb-4">Statistiques de la plateforme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F9F6F0] rounded-xl p-4 shadow-sm flex flex-col items-center">
              <span className="text-5xl mb-2">📈</span>
              <span className="text-xl font-bold">12</span>
              <span className="text-sm text-[#185A4E]">Covoiturages/jour</span>
            </div>
            <div className="bg-[#F9F6F0] rounded-xl p-4 shadow-sm flex flex-col items-center">
              <span className="text-5xl mb-2">💰</span>
              <span className="text-xl font-bold">256</span>
              <span className="text-sm text-[#185A4E]">Crédits gagnés/jour</span>
            </div>
            <div className="bg-[#F9F6F0] rounded-xl p-4 shadow-sm flex flex-col items-center">
              <span className="text-5xl mb-2">🔢</span>
              <span className="text-xl font-bold">6 352</span>
              <span className="text-sm text-[#185A4E]">Total crédits gagnés</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#185A4E] mb-4">Suspendre un compte</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center bg-[#F9F6F0] rounded-xl p-4 shadow-sm">
              <span>Pierre (employé)</span>
              <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-700">Suspendre</button>
            </li>
            <li className="flex justify-between items-center bg-[#F9F6F0] rounded-xl p-4 shadow-sm">
              <span>Marie (utilisateur)</span>
              <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-700">Suspendre</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
