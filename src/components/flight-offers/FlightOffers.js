import React, { useState } from 'react';
//import './../main/chat/Chat.module.css';
import axios from 'axios';
import './FlightOffers.css';


function FlightOffers() {
  const displayAction = false;
  const [originCode, setOriginCode] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [adults, setAdults] = useState(null);
  const [max, setMax] = useState(null);
  const [data, setData] = useState(null);

  //const handleChange = (event) => {
  //  setInputValue(event.target.value);
  //};

  const handleSubmit = async (event) => {

    event.preventDefault(); // Prevents the default form submission behavior
    alert(`Form submitted with input: ${originCode}, ${destinationCode}, ${departureDate}, ${returnDate}, ${adults}, ${max}`);
  
    const xhr = new XMLHttpRequest();
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originCode}&destinationLocationCode=${destinationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&max=${max}`;
    alert(url);
    xhr.open('GET', url);
    xhr.setRequestHeader( 'Content-Type',   'application/json' );
    xhr.setRequestHeader( 'Accept', 'application/json' );

        // get token from amadeus.com and set it to the request header
        const params = { client_id: '8MZHzmoKlM1AoyFYUGLDbelapLam3G4S', client_secret: '9GbiOIcx75Ctuj4F', grant_type: 'client_credentials' };
        await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", params, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          alert("Response token: " + response.data.access_token);
          alert(response.status);
          let token = response.data.access_token;
          alert("Let token = " + token);
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        });
    //xhr.setRequestHeader("Authorization", "Bearer uBtidILINAobC6bkTxujGKyZbrGt" ); 

    xhr.onload = function() {
      if (xhr.status === 200) { //Status 200 is OK
        setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  };

  return(
    <div className="container">
      
      {displayAction && <p></p>}
      <form onSubmit={handleSubmit}>
        <table>
        <th align="left"><b>Enter Flight Info:</b></th>
        <tr>
          <td><label for="origin">Origin Location Code:</label></td>
          <td><input type="text" value={originCode} onChange={(e) => setOriginCode(e.target.value)} class="form-control" id="origin" name="origin"></input></td>
        </tr>
        <tr>
          <td><label for="destination">Destination Location Code:</label></td>
          <td><input type="text" value={destinationCode} onChange={(e) => setDestinationCode(e.target.value)} class="form-control" id="destination" name="destination"></input></td>
        </tr>
        <tr>
          <td><label for="departureDate">Departure Date:</label></td>
          <td><input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} class="form-control" id="departureDate"  name="departureDate"></input></td>
        </tr>
        <tr>
          <td><label for="returnDate">Return Date:</label></td>
          <td><input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} class="form-control" id="returnDate"  name="returnDate"></input></td>
        </tr>
        <tr>
          <td><label for="adults">Adults:</label></td>
          <td><input type="number" value={adults} onChange={(e) => setAdults(e.target.value)} class="form-control" id="adults" name="adults"></input></td>
        </tr>
        <tr>
        <td><label for="max">Max:</label></td>
        <td><input type="number" value={max} onChange={(e) => setMax(e.target.value)} class="form-control" id="max" name="max"></input></td>
        </tr>
        </table>
        <b> &nbsp; </b>
        <p><b></b><button type="submit">Submit</button></p>
      </form>
      <p></p>
      <p>The input values are {originCode}, {destinationCode}, {departureDate}, {returnDate}, {adults}, {max}</p>
      <p>The response is:</p>
      {data ? <div><b>Total count of flight offers: {data.meta.count}</b></div> : <div>Loading...</div>}

      {data ? 
      <div>
        <table>
        <tr>
          <td><label>Segment</label></td>
          <td><label>From</label></td>
          <td><label>To</label></td>
          <td><label>Departure Time</label></td>
          <td><label>Arrival Time</label></td>
        </tr>

        {data.data[0].itineraries[0].segments.map((item, index) => (
        <tr>
        <td><label>{index + 1}</label></td>
        <td><label>{item.departure.iataCode}</label></td>
        <td><label>{item.arrival.iataCode}</label></td>
        <td><label>{item.departure.at}</label></td>
        <td><label>{item.arrival.at}</label></td>
        </tr>
        ))}

        
        </table>
      </div> 
      
      : <div>Loading...</div>}
      {data ? <div><center><pre>{JSON.stringify(data, '', 2)}</pre></center></div> : <div>Loading...</div>}


    </div>
    
  )
}

//<th align="left"><b>Flight Offers {offer.id}</b></th>
/*
        <table>
        <tr>
          <td><label>Segment</label></td>
          <td><label>From</label></td>
          <td><label>To</label></td>
          <td><label>Departure Time</label></td>
          <td><label>Arrival Time</label></td>
        </tr>

        {data.data[0].itineraries[0].segments.map((item, index) => (
        <tr>
        <td><label>{index + 1}</label></td>
        <td><label>{item.departure.iataCode}</label></td>
        <td><label>{item.arrival.iataCode}</label></td>
        <td><label>{item.departure.at}</label></td>
        <td><label>{item.arrival.at}</label></td>
        </tr>
        ))}

        
        </table>
        */
export default FlightOffers;