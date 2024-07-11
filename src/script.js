document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize the map
    var map = L.map('map').setView([51.505, -0.09], 2); // Set the initial view to a wide area.

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Predefined popular destinations
    var destinations = [
        { name: "Paris, France", coords: [48.8566, 2.3522] },
        { name: "Bora Bora, France", coords: [-16.5055, -151.7427] },
        { name: "Glacier National Park, USA", coords: [48.6691, -113.7222] },
        { name: "Romer, Italy", coords: [41.8966, 12.4822] },
        { name: "Swiss Alps, Switzerland", coords: [46.5600, 8.5610] }
    ];

    // Function to add markers for destinations
    function addMarkers(destinations) {
        destinations.forEach(function(destination) {
            L.marker(destination.coords).addTo(map)
                .bindPopup(`<b>${destination.name}</b>`)
                .openPopup();
        });
    }

    // Add initial markers for popular destinations
    addMarkers(destinations);

    // Add an input for user to enter their destination
    var inputContainer = L.control({ position: 'topright' });
    inputContainer.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'input-container');
        div.innerHTML = `
            <input type="text" id="destination-input" placeholder="Enter your destination" />
            <button id="find-destination">Go</button>
            <button id="reset-map">Reset</button>
        `;
        return div;
    };
    inputContainer.addTo(map);

    // Simple lookup table for destination coordinates
    var destinationLookup = {
        "paris": [48.8566, 2.3522],
        "new york": [40.7128, -74.0060],
        "tokyo": [35.6895, 139.6917],
        "sydney": [-33.8688, 151.2093]
        // Add more destinations as needed
    };

    // Function to find the destination entered by the user
    document.getElementById('find-destination').onclick = function() {
        var destination = document.getElementById('destination-input').value.trim().toLowerCase();
        var userDestinationCoords = destinationLookup[destination];
        if (userDestinationCoords) {
            // Center the map to the user's destination
            map.setView(userDestinationCoords, 10);
            L.marker(userDestinationCoords).addTo(map)
                .bindPopup(`<b>${destination.charAt(0).toUpperCase() + destination.slice(1)}</b>`)
                .openPopup();
        } else {
            alert('Destination not found. Please enter a valid destination.');
        }
    };

    // Function to reset the map to initial state with predefined destinations
    document.getElementById('reset-map').onclick = function() {
        map.setView([51.505, -0.09], 2); // Reset to the initial view
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer); // Remove all existing markers
            }
        });
        addMarkers(destinations); // Add initial markers for popular destinations
    };
});

