// src/components/LocationPage.js

import React, { useEffect, useState } from 'react';
import LocationDetails from './LocationDetails';
import axios from 'axios';

const LocationPage = ({ match }) => {
    const [location, setLocation] = useState(null);
    const locationId = match.params.id; // Assuming you use React Router

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`/api/locations/${locationId}`);
                setLocation(response.data);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };

        fetchLocation();
    }, [locationId]);

    return <LocationDetails location={location} />;
};

export default LocationPage;
