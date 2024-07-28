import React from 'react';
import Packing from 'assets/Tips&Tricks/Packing.jpg';
import Travelsafety from 'assets/Tips&Tricks/Travelsafety.jpg';
import Budgettravel from 'assets/Tips&Tricks/Budgettravel.jpg';
import Insights from 'assets/Tips&Tricks/Insights.jpg';
import Eco from 'assets/Tips&Tricks/Eco.jpg';
import styles from './ScrollableTips&Tricks.module.css';

const ScrollableDestination = () => {
  return (
    <section id="scrollable-destination" className={`${styles['scrollable-destination']} ${styles['flex-container']}`}>
      <div className={styles.container}>
        <h2 className="original-h2">Unique Travel Tips and Hacks</h2>
        <div className={styles['image-container']}>
          <div className={styles['image-box']}>
            <img src={Packing} alt="Packing" />
            <div className={styles.description}>
              <strong>Packing Tips</strong><br />
              Master the art of packing with our top tips: use packing cubes to keep items organized, roll your clothes to save space, and always pack a small laundry bag for dirty clothes. Don’t forget to bring a portable charger and universal adapter for your electronics.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={Travelsafety} alt="Travelsafety" />
            <div className={styles.description}>
              <strong>Travel Safety</strong><br />
              Stay safe on your adventures with these essential hacks: use a money belt or neck pouch to keep your valuables secure, always make copies of important documents, and keep emergency contact numbers handy. Be aware of your surroundings and trust your instincts.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={Budgettravel} alt="Budgettravel" />
            <div className={styles.description}>
              <strong>Budget Travel</strong><br />
              Discover budget-friendly travel tips: eat like a local by exploring street food and markets, use public transportation instead of taxis, and take advantage of free walking tours. Always negotiate prices in markets and consider traveling during the off-season for lower rates.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={Insights} alt="Insights" />
            <div className={styles.description}>
              <strong>Local Insights</strong><br />
              Gain insider knowledge from locals: chat with residents for recommendations, visit lesser-known attractions, and attend local festivals or events. Explore neighborhoods beyond the tourist spots to find unique experiences and hidden gems.
            </div>
          </div>
          <div className={styles['image-box']}>
            <img src={Eco} alt="Eco" />
            <div className={styles.description}>
              <strong>Eco-Friendly Travel</strong><br />
              Travel sustainably with these eco-friendly tips: carry a reusable water bottle and shopping bag, choose eco-friendly accommodations, and minimize your carbon footprint by walking or biking. Participate in local conservation efforts and respect wildlife and natural habitats.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollableDestination;  