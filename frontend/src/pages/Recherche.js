import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Recherche() {
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Pour le moment, tu peux juste rediriger vers resultats avec mock
    navigate("/resultats-recherche");
  }

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F8F3EC] py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#185A4E] mb-6 text-center">Rechercher un trajet</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            required
            type="text"
            value={depart}
            onChange={e => setDepart(e.target.value)}
            placeholder="Ville de départ"
            className="p-3 rounded-lg border"
          />
          <input
            required
            type="text"
            value={arrivee}
            onChange={e => setArrivee(e.target.value)}
            placeholder="Ville d'arrivée"
            className="p-3 rounded-lg border"
          />
          <input
            required
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="p-3 rounded-lg border"
          />
          <button
            type="submit"
            className="bg-green-900 text-white px-8 py-3 rounded-xl font-bold text-lg shadow hover:bg-green-800 transition"
          >
            Rechercher
          </button>
        </form>
      </div>
    </section>
  );
}
