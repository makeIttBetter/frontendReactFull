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

const MapSection = () => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      const map = L.map(mapContainer.current).setView([51.505, -0.09], 2);
      mapInstance.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const destinations = [
        { name: "Paris, France", coords: [48.8566, 2.3522] },
        { name: "Bora Bora, France", coords: [-16.5055, -151.7427] },
        { name: "Glacier National Park, USA", coords: [48.6691, -113.7222] },
        { name: "Rome, Italy", coords: [41.8966, 12.4822] },
        { name: "Swiss Alps, Switzerland", coords: [46.5600, 8.5610] }
      ];

      const addMarkers = (destinations) => {
        destinations.forEach((destination) => {
          L.marker(destination.coords).addTo(map)
            .bindPopup(`<b>${destination.name}</b>`)
            .openPopup();
        });
      };

      addMarkers(destinations);

      const inputContainer = L.control({ position: 'topright' });
      inputContainer.onAdd = function () {
        const div = L.DomUtil.create('div', 'input-container');
        div.innerHTML = `
          <input type="text" id="destination-input" placeholder="Enter your destination" />
          <button id="find-destination">Go</button>
          <button id="reset-map">Reset</button>
        `;
        return div;
      };
      inputContainer.addTo(map);

      const destinationLookup = {
        "paris": [48.8566, 2.3522],
        "new york": [40.7128, -74.0060],
        "tokyo": [35.6895, 139.6917],
        "sydney": [-33.8688, 151.2093]
      };

      document.getElementById('find-destination').onclick = function () {
        const destination = document.getElementById('destination-input').value.trim().toLowerCase();
        const userDestinationCoords = destinationLookup[destination];
        if (userDestinationCoords) {
          map.setView(userDestinationCoords, 10);
          L.marker(userDestinationCoords).addTo(map)
            .bindPopup(`<b>${destination.charAt(0).toUpperCase() + destination.slice(1)}</b>`)
            .openPopup();
        } else {
          alert('Destination not found. Please enter a valid destination.');
        }
      };

      document.getElementById('reset-map').onclick = function () {
        map.setView([51.505, -0.09], 2);
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });
        addMarkers(destinations);
      };
    }
  }, []);

  return (
    <section id="map-section" className={`${styles['map-section']} ${styles['flex-container']}`}>
      <div className={styles.container}>
        <h2 className="original-h2">Interactive Map</h2>
        <p>Discover popular travel destinations or input your destination to see personalized recommendations.</p>
        <div id="map" ref={mapContainer} className={styles.map}></div>
      </div>
    </section>
  );
};

export default MapSection;
