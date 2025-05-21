export default function MentionsLegales() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#F8F3EC] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-[#185A4E] mb-4">
          Mentions légales
        </h2>
        <p className="text-[#1D3B2A] mb-4">
          <b>Éditeur du site :</b>  
          <br />
          EcoRide - Plateforme de covoiturage écologique<br />
          <b>Responsable de la publication :</b> Monsieur Etudiant<br />
          <b>Email :</b> contact@ecoride.com
        </p>
        <p className="text-[#1D3B2A] mb-4">
          <b>Hébergement :</b>
          <br />
          Plateforme hébergée par Vercel
        </p>
        <p className="text-[#1D3B2A]">
          <b>Protection des données :</b>
          <br />
          Les informations collectées sur ce site sont uniquement destinées à la gestion des covoiturages et à la mise en relation des utilisateurs.  
          Vous disposez d’un droit d’accès, de modification et de suppression de vos données personnelles (conformément à la loi Informatique et Libertés du 6 janvier 1978 et au RGPD).
        </p>
      </div>
    </section>
  );
}
