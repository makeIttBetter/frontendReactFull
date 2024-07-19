import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from "@react-google-maps/api";
import "./GoogleMapsComponent.css";

const center = {
  lat: 26.2409,
  lng: -60.0404
};

const destinations = [
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
      // Add markers for each destination
      setMarkers(destinations.map(dest => ({
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
      map.panTo(place.geometry.location);
    }
  };

  return (
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
          <input
            type="text"
            placeholder="Search for a place"
            ref={searchBoxRef}
            className="search-input"
          />
        </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsComponent;

