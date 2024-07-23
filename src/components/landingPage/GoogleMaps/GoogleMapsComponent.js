import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from "@react-google-maps/api";
import "./GoogleMapsComponent.css";

const center = {
  lat: 26.2409,
  lng: -60.0404
};

const initialDestinations = [
  { name: "Paris, France", coords: [48.8566, 2.3522] },
  { name: "Bora Bora, France", coords: [-16.5055, -151.7427] },
  { name: "Glacier National Park, USA", coords: [48.6691, -113.7222] },
  { name: "Rome, Italy", coords: [41.8966, 12.4822] },
  { name: "Swiss Alps, Switzerland", coords: [46.5600, 8.5610] }
];

const GoogleMapsComponent = () => {
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const searchBoxRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map) {
      // Add markers for each initial destination
      setMarkers(initialDestinations.map(dest => ({
        position: { lat: dest.coords[0], lng: dest.coords[1] },
        name: dest.name
      })));
    }
  }, [map]);

  const onLoadMap = (mapInstance) => {
    setMap(mapInstance);
  };

  const onLoadSearchBox = (searchBoxInstance) => {
    setSearchBox(searchBoxInstance);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    if (place.geometry && place.geometry.location) {
      // Clear existing markers
      setMarkers([]);

      // Pan to new place and add marker
      map.panTo(place.geometry.location);
      setMarkers([{
        position: place.geometry.location.toJSON(),
        name: place.name || "New Place"
      }]);
    }
  };

  const resetMap = () => {
    map.panTo(center);
    setMarkers(initialDestinations.map(dest => ({
      position: { lat: dest.coords[0], lng: dest.coords[1] },
      name: dest.name
    })));
  };

  return (
    <div className="map-container">
      <h1 className="map-title">Search, Zoom, and Discover</h1>
      <LoadScript googleMapsApiKey="AIzaSyA1ehPKqrA7EzlT_6Mdc7th4I6TEU_3nzc" libraries={["places"]}>
        <GoogleMap
          mapContainerClassName="container"
          center={center}
          zoom={3}
          onLoad={onLoadMap}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              label={marker.name}
            />
          ))}
          <StandaloneSearchBox
            onLoad={onLoadSearchBox}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for a place"
                ref={searchBoxRef}
                className="search-input"
              />
              <button onClick={resetMap} className="reset-button">Reset</button>
            </div>
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapsComponent;


