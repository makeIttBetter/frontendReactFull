import React from 'react';

const LocationDetails = ({ location }) => {
    if (!location) {
        return <p>No location details available.</p>;
    }

    return (
        <div>
            <h2>{location.location}</h2>
            <a href={location.link} target="_blank" rel="noopener noreferrer">
                Visit the location
            </a>
        </div>
    );
};

export default LocationDetails;