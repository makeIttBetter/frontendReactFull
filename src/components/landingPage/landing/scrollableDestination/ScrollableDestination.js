import React from 'react';
import paris from 'assets/places/paris.jpg';
import borabora from 'assets/places/borabora.jpg';
import glacier from 'assets/places/glacier.jpg';
import rome from 'assets/places/rome.jpg';
import swissalps from 'assets/places/swissalps.jpg';
import styles from './ScrollableDestination.module.css';

const destinations = [
  { image: paris, alt: "Paris", title: "Paris", subtitle: "France" },
  { image: borabora, alt: "Bora Bora", title: "Bora Bora", subtitle: "French Polynesia"},
  { image: glacier, alt: "Glacier National Park", title: "Glacier National Park", subtitle:"USA" },
  { image: rome, alt: "Rome", title: "Rome" , subtitle:"Italy"},
  { image: swissalps, alt: "Swiss Alps", title: "Swiss Alps", subtitle: "Switzerland"}
];

const ScrollableDestination = () => {
  return (
    <section id="scrollable-destination" className={styles['scrollable-destination']}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Popular Travel Destinations</h2>
        <div className={styles['image-container']}>
          {destinations.map((destination, index) => (
            <div
              key={index}
              className={styles['card']}
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              <div className={styles['card-info']}>
                <div className={styles['card-title']}>{destination.title}</div>
                <div className={styles['card-subtitle']}>{destination.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollableDestination;
