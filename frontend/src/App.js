import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Accueil from "./pages/Accueil";
import Recherche from "./pages/Recherche";
import ResultatsRecherche from "./pages/ResultatsRecherche";
import Connexion from "./pages/Connexion";
import Admin from "./pages/Admin";
import Employe from "./pages/Employe";
import UserEspace from "./pages/UserEspace";
import MentionsLegales from "./pages/MentionsLegales";
import CGU from "./pages/CGU";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/resultats-recherche" element={<ResultatsRecherche />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/user-espace" element={<UserEspace />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/employe" element={<Employe />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/resultats" element={<ResultatsRecherche />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/contact" element={<Contact />} />
          {/* Route 404 */}
          <Route path="*" element={<div className="text-red-700 text-xl">Page non trouvée</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
