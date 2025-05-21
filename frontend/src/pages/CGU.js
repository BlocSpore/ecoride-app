export default function CGU() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#F8F3EC] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-[#185A4E] mb-4">
          Conditions Générales d’Utilisation (CGU)
        </h2>
        <p className="text-[#1D3B2A] mb-4">
          <b>Bienvenue sur EcoRide !</b>  
          En utilisant la plateforme, vous acceptez les présentes conditions d’utilisation, détaillées ci-dessous.
        </p>
        <ul className="list-disc pl-5 text-[#1D3B2A] mb-4 space-y-2">
          <li>
            <b>Objet :</b> EcoRide met en relation conducteurs et passagers souhaitant partager un trajet dans une démarche écologique et solidaire.
          </li>
          <li>
            <b>Inscription :</b> Chaque utilisateur doit fournir des informations exactes lors de l’inscription et mettre à jour son profil en cas de modification.
          </li>
          <li>
            <b>Responsabilités :</b> Le conducteur certifie être titulaire d’un permis valide et que son véhicule est assuré, en bon état de fonctionnement et conforme à la réglementation en vigueur.
          </li>
          <li>
            <b>Utilisation :</b> Les utilisateurs s’engagent à adopter une attitude respectueuse, à ne pas tenir de propos discriminatoires ou offensants et à signaler tout incident.
          </li>
          <li>
            <b>Règlement des litiges :</b> En cas de différend entre utilisateurs, EcoRide propose un service de médiation mais n’est pas responsable des dommages directs ou indirects résultant d’un trajet.
          </li>
          <li>
            <b>Protection des données :</b> EcoRide s’engage à protéger les données personnelles conformément à la réglementation en vigueur (RGPD).
          </li>
          <li>
            <b>Modification des CGU :</b> EcoRide se réserve le droit de modifier les CGU à tout moment. Toute modification sera signalée sur la plateforme.
          </li>
          <li>
            L’utilisation de la plateforme implique l’acceptation pleine et entière des présentes CGU.
          </li>
        </ul>
        <p className="text-[#1D3B2A]">
          Pour toute question ou signalement, veuillez consulter la page <b>Contact</b> ou écrire à : contact@ecoride.com
        </p>
      </div>
    </section>
  );
}
