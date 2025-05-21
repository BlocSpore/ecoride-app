export default function Employe() {
  return (
    <section className="min-h-[90vh] bg-[#F8F3EC] flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#185A4E] mb-8 text-center">
          Espace Employé
        </h2>
        {/* Bloc modération des avis */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#185A4E] mb-3">Avis à modérer</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center bg-[#F9F6F0] rounded-xl p-4 shadow-sm">
              <span>“Chauffeur très ponctuel !”</span>
              <div>
                <button className="bg-green-700 text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-900">Valider</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">Refuser</button>
              </div>
            </li>
          </ul>
        </div>
        {/* Bloc covoiturages problématiques */}
        <div>
          <h3 className="text-xl font-bold text-[#185A4E] mb-3">Trajets problématiques</h3>
          <ul className="space-y-4">
            <li className="bg-[#F9F6F0] rounded-xl p-4 shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <span className="font-semibold text-[#185A4E]">#COV12345</span>
                  <span className="mx-2">•</span>
                  <span>Pierre (pierre@mail.com)</span>
                  <span className="mx-2">|</span>
                  <span>Marie (marie@mail.com)</span>
                </div>
                <div className="text-sm text-[#1D3B2A] mt-2 md:mt-0">
                  12 mai 2025, 10h15 — Besançon → Montbéliard
                </div>
              </div>
              <p className="mt-2 text-sm">Problème : Chauffeur en retard de 30 minutes.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
