import { Link } from "react-router-dom";
import { Leaf } from "lucide-react"; // Si tu as lucide-react d’installé

export default function Accueil() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3EC] relative">
      {/* Background illustration (facultatif) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="opacity-10" style={{position: 'absolute'}}>
          <circle cx="80%" cy="30%" r="180" fill="#a7f3d0" />
          <circle cx="10%" cy="80%" r="90" fill="#bbf7d0" />
        </svg>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center max-w-2xl w-full">
          {/* Titre/Slogan avec icône */}
          <h1 className="text-4xl font-bold text-[#185A4E] mb-6 text-center flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-700 inline" />
            Voyagez vert, partagez la route!
          </h1>
          {/* Bouton */}
          <Link
            to="/recherche"
            className="bg-green-900 text-white px-8 py-3 rounded-xl text-lg font-bold shadow hover:bg-green-800 hover:scale-105 transition-transform duration-200 mb-8"
          >
            🚗 Rechercher un trajet
          </Link>
          {/* Texte explicatif */}
          <p className="text-lg text-[#1D3B2A] text-center mb-2">
            <b>EcoRide</b> est une plateforme de <b>covoiturage écologique</b> qui connecte conducteurs et passagers pour des trajets plus <b>verts, économiques et solidaires</b>.
          </p>
          <p className="text-lg text-[#1D3B2A] text-center">
            Simple, rapide et locale, EcoRide vous aide à <b>réduire votre impact carbone</b> tout en <b>faisant des rencontres chaleureuses</b> sur la route! <span role="img" aria-label="plante">🌱</span>
          </p>
        </div>
      </main>
      <footer className="text-[#185A4E] text-xs text-center py-4 relative z-10">
        © EcoRide 2025 - Tous droits réservés
        <span className="mx-2">|</span>
        <Link to="/mentions-legales" className="hover:underline">Mentions légales</Link>
        <span className="mx-2">|</span>
        <Link to="/cgu" className="hover:underline">CGU</Link>
        <span className="mx-2">|</span>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </footer>
    </div>
  );
}

