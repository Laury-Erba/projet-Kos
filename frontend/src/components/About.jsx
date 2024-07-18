import React from "react";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about_content">
        <h2>About</h2>
        <p>
          Kos est une plateforme e-commerce innovante dédiée à la promotion et à
          la vente de céramiques artisanales. Nous célébrons l'art de la
          céramique, mettant en lumière des créations uniques réalisées par des
          artisans passionnés. Chaque pièce que vous trouverez sur Kos est
          façonnée avec soin, témoignant du savoir-faire et de la créativité de
          ses créateurs.
        </p>
        <p>
          Notre engagement envers l'environnement est au cœur de notre mission.
          En favorisant l'artisanat local et des pratiques de production
          durables, nous réduisons notre empreinte écologique. Les produits en
          céramique disponibles sur Kos sont non seulement esthétiques et
          fonctionnels, mais ils incarnent également des valeurs de durabilité
          et de respect de la nature.
        </p>
        <p>
          Choisir Kos, c'est soutenir des artisans talentueux et adopter un mode
          de consommation responsable. Découvrez notre collection et
          laissez-vous inspirer par la beauté et l'authenticité de la céramique
          artisanale, tout en contribuant à un avenir plus vert.
        </p>
      </div>

      <img
        src="/public/images/assiette-blanche.webp"
        alt="belle ceramique blanche kos"
      />
    </section>
  );
};

export default About;
