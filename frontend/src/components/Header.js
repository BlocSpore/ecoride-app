import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isConnected = !!localStorage.getItem("isConnected");
  const role = localStorage.getItem("role");

  function handleLogout() {
    localStorage.removeItem("isConnected");
    localStorage.removeItem("role");
    navigate("/connexion");
  }

  return (
    <header className="bg-green-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold"><Link to="/">EcoRide</Link></h1>
      <nav>
        <ul className="flex gap-6">
          <li><Link to="/accueil">Accueil</Link></li>
          <li><Link to="/recherche">Trajets</Link></li>
          {!isConnected && (
            <li><Link to="/connexion">Connexion</Link></li>
          )}

          {isConnected && role === "user" && (
            <>
              <li><Link to="/user-espace">Mon espace</Link></li>
              <li>
                <button onClick={handleLogout} className="underline hover:text-gray-300">Déconnexion</button>
              </li>
            </>
          )}

          {isConnected && role === "employe" && (
            <>
              <li><Link to="/employe">Espace Employé</Link></li>
              <li>
                <button onClick={handleLogout} className="underline hover:text-gray-300">Déconnexion</button>
              </li>
            </>
          )}

          {isConnected && role === "admin" && (
            <>
              <li><Link to="/user-espace">Mon espace</Link></li>
              <li><Link to="/employe">Espace Employé</Link></li>
              <li><Link to="/admin">Espace Admin</Link></li>
              <li>
                <button onClick={handleLogout} className="underline hover:text-gray-300">Déconnexion</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
