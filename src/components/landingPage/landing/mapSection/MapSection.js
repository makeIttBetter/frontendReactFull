import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapSection.module.css';

// Setting the paths to the default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const destinations = [
  { name: "Paris, France", coords: [48.8566, 2.3522] },
  { name: "Bora Bora, France", coords: [-16.5055, -151.7427] },
  { name: "Glacier National Park, USA", coords: [48.6691, -113.7222] },
  { name: "Rome, Italy", coords: [41.8966, 12.4822] },
  { name: "Swiss Alps, Switzerland", coords: [46.5600, 8.5610] }
];

const MapFeatures = () => {
  const mapRefs = useRef(destinations.map(() => React.createRef()));

  useEffect(() => {
    mapRefs.current.forEach((mapRef, index) => {
      if (!mapRef.current._leaflet_id) {
        const { coords, name } = destinations[index];
        const map = L.map(mapRef.current).setView(coords, 4); // Zoom level set to 4 for a further view

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coords).addTo(map)
          .bindPopup(`<b>${name}</b>`)
          .openPopup();
      }
    });
  }, []);

  return (
    <section id='scrollable-destination' className={`${styles['scrollable-destination']} ${styles['flex-container']}`}>
      <div className={styles.container}>
        <h2 className='original-h2'>Enhance Your Travel Experience!</h2>
        <div className={styles['image-container']}>
          {destinations.map((destination, index) => (
            <div key={index} className={styles['image-box']}>
              <div ref={mapRefs.current[index]} className={styles.map}></div>
              <div className={styles.description}>
                <strong>{destination.name}</strong><br />
                Discover the beauty of {destination.name}.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapFeatures;
