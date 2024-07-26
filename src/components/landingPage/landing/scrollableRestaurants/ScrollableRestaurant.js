import React from 'react';
import LePetitCardinal from 'assets/restaurants/LePetitCardinal.jpg';
import BoraBoraYachtClub from 'assets/restaurants/BoraBoraYachtClub.jpg';
import SunFlowerCaffeeandBBQ from 'assets/restaurants/SunFlowerCaffeeandBBQ.jpg';
import Dolce from 'assets/restaurants/Dolce.jpg';
import AescherBerggasthaus from 'assets/restaurants/AescherBerggasthaus.jpg';
import styles from './ScrollableRestaurant.module.css';

const ScrollableDestination = () => {
  return (
    <section id="scrollable-destination" className={`${styles['scrollable-destination']} ${styles['flex-container']}`}>
      <div className={styles.container}>
        <h2 className="original-h2">Gourmet Destination Highlights</h2>
        <div className={styles['image-container']}>
          <div className={styles['image-box']}>
            <img src={LePetitCardinal} alt="Le Petit Cardinal" />
            <div className={styles.description}>
              <strong>Le Petit Cardinal. Paris, France</strong><br />
              Nestled in the heart of Paris, Le Petit Cardinal offers an authentic French dining experience with a charming ambiance reminiscent of classic Parisian cafes. Renowned for its delightful selection of pastries, freshly brewed coffee, and traditional French cuisine, this quaint eatery invites you to savor dishes like croissants, quiche, and coq au vin. With its cozy interior and welcoming atmosphere, Le Petit Cardinal is the perfect spot to relax and indulge in the culinary delights of France.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={BoraBoraYachtClub} alt="Bora Bora Yacht Club" />
            <div className={styles.description}>
              <strong>Bora Bora Yacht Club. Bora Bora, French Polynesia</strong><br />
              The Bora Bora Yacht Club, located on the breathtaking island of Bora Bora, is a haven for food enthusiasts and maritime lovers alike. This waterfront restaurant offers stunning views of the lagoon, providing the perfect backdrop for a memorable dining experience. The menu features a fusion of French and Polynesian cuisine, with fresh seafood, tropical fruits, and locally sourced ingredients taking center stage. Enjoy dishes such as poisson cru, mahi-mahi, and coconut-infused desserts while watching the sunset over the crystal-clear waters.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={SunFlowerCaffeeandBBQ} alt="Sun Flower Cafe and BBQ" />
            <div className={styles.description}>
              <strong>Sun Flower Cafe and BBQ. West Glacier, USA</strong><br />
              Sun Flower Cafe and BBQ in West Glacier, Montana, is a delightful eatery that combines rustic charm with hearty American fare. Situated near the entrance to Glacier National Park, this cafe is a popular stop for both locals and travelers. The menu boasts a variety of BBQ specialties, including slow-cooked ribs, brisket, and pulled pork, all served with house-made sauces and sides. In addition to its savory BBQ offerings, the cafe also features fresh salads, homemade pies, and a selection of local craft beers, making it a must-visit spot for a satisfying meal.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={Dolce} alt="Dolce" />
            <div className={styles.description}>
              <strong>Dolce. Rome, Italy</strong><br />
              Dolce, located in the historic center of Rome, is a sophisticated restaurant that offers a taste of Italy's rich culinary heritage. With its elegant decor and warm atmosphere, Dolce invites guests to enjoy a variety of Italian dishes crafted with passion and authenticity. The menu includes classics such as handmade pasta, wood-fired pizzas, and delectable desserts like tiramisu and panna cotta. Paired with an extensive wine list featuring regional Italian wines, dining at Dolce promises a delightful gastronomic journey through the flavors of Italy.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={AescherBerggasthaus} alt="Aescher Bergghasthaus" />
            <div className={styles.description}>
              <strong>Aescher Bergghasthaus. Swiss Alps, Switzerland</strong><br />
              Perched on a cliffside in the stunning Swiss Alps, Aescher Berggasthaus is a unique mountain restaurant that offers breathtaking views and a rustic alpine dining experience. Accessible via hiking trails or a cable car ride, this historic guesthouse serves traditional Swiss dishes made with locally sourced ingredients. Guests can enjoy hearty meals such as cheese fondue, rösti, and alpine sausages while taking in panoramic views of the surrounding peaks and valleys. The cozy, wood-paneled interior and friendly hospitality make Aescher Berggasthaus a memorable destination for adventurers and food lovers alike.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollableDestination;   