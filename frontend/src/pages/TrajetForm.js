export default function TrajetForm() {
  return (
    <section className="min-h-[90vh] bg-[#F8F3EC] flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#185A4E] mb-8 text-center">
          Publier un nouveau trajet
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Colonne gauche */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="font-semibold text-[#1D3B2A]">Ville de départ</label>
              <input type="text" className="w-full mt-2 p-2 rounded-lg border" placeholder="Ex : Besançon"/>
            </div>
            <div>
              <label className="font-semibold text-[#1D3B2A]">Date de départ</label>
              <input type="date" className="w-full mt-2 p-2 rounded-lg border"/>
            </div>
            <div>
              <label className="font-semibold text-[#1D3B2A]">Choix du véhicule</label>
              <select className="w-full mt-2 p-2 rounded-lg border">
                <option>Choisir un véhicule</option>
                <option>Peugeot 208</option>
                <option>Renault Zoe</option>
              </select>
              <button
                type="button"
                className="mt-2 text-green-700 underline hover:text-green-900 text-sm"
              >
                + Ajouter un véhicule
              </button>
            </div>
          </div>
          {/* Colonne droite */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="font-semibold text-[#1D3B2A]">Ville d’arrivée</label>
              <input type="text" className="w-full mt-2 p-2 rounded-lg border" placeholder="Ex : Montbéliard"/>
            </div>
            <div>
              <label className="font-semibold text-[#1D3B2A]">Heure de départ</label>
              <input type="time" className="w-full mt-2 p-2 rounded-lg border"/>
            </div>
            <div>
              <label className="font-semibold text-[#1D3B2A]">Nombre de places</label>
              <input type="number" min="1" max="6" className="w-full mt-2 p-2 rounded-lg border" placeholder="3"/>
            </div>
          </div>
        </form>
        <div className="mt-8 flex flex-col items-center">
          <label className="font-semibold text-[#1D3B2A] mb-2">Conditions particulières</label>
          <textarea className="w-full p-2 rounded-lg border mb-4 min-h-[80px]" placeholder="Ex : pas d’animaux, bagages limités…"></textarea>
          <button
            type="submit"
            className="bg-[#185A4E] text-white px-8 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-green-800 transition"
          >
            Publier le trajet
          </button>
        </div>
      </div>
    </section>
  );
}
