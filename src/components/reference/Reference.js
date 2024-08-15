import React, { useState } from 'react';
// import './../main/chat/Chat.module.css';
import './Reference.css';
//import {AmadeusAuth}  from './AmadeusAuth';
import axios from 'axios';

async function getAmadeusAuthAxios() {
  //const [token, setToken] = useState(null);

  const params = { client_id: '8MZHzmoKlM1AoyFYUGLDbelapLam3G4S', client_secret: '9GbiOIcx75Ctuj4F', grant_type: 'client_credentials' };
  await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", params, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => {
    alert("Response token: " + response.data.access_token);
    alert(response.status);
    return response.data.access_token;
    //setToken(response.data.access_token);
    //token = "zMKFLFm64Rk8kHASH1QfnsYsQDRu";
    //console.log(response.status, response.data.token);
    //return token;
  });
}

/*
function getAmadeusAuth() {

    //event.preventDefault(); // Prevents the default form submission behavior
    alert(`Calling AmadeusAuth()...`);

    const xhr = new XMLHttpRequest();
    const url = `https://test.api.amadeus.com/v1/security/oauth2/token`;
    
    xhr.open('POST', url);
    xhr.setRequestHeader( 'Content-Type',   'application/x-www-form-urlencoded' );
    //xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    //xhr.setRequestHeader( 'Accept', 'application/json' );
    const params = { client_id: '8MZHzmoKlM1AoyFYUGLDbelapLam3G4S', client_secret: '9GbiOIcx75Ctuj4F', grant_type: 'client_credentials' };
  
    const body = JSON.stringify(params);
    const response = null;
    xhr.onload = () => {
      if (xhr.status == 200) {
        response = JSON.parse(xhr.responseText);
        console.log(JSON.parse(xhr.responseText));
      } else {
        alert(`Error: ${xhr.status}`);
      }
    };
    xhr.send(body);
      //if (xhr.status === 200) { //Status 200 is OK
      //  response = JSON.parse(xhr.responseText);
      //}
   
 
    alert('Token is: ' + response);
  return response;
} */

function Reference() {
  const greeting = "greeting";
  const displayAction = false;
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {

    event.preventDefault(); // Prevents the default form submission behavior
    alert(`Form submitted with input: ${inputValue}`);

    const xhr = new XMLHttpRequest();
    // xhr.open('GET', 'https://jsonplaceholder.typicode.com/comments?id=1');
    const url = `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${inputValue}&subType=CITY,AIRPORT`;
    
    xhr.open('GET', url);
    // xhr.open('GET', 'https://test.api.amadeus.com/v1/reference-data/locations?keyword=Houston&subType=CITY,AIRPORT');
    //const bearerToken = "SyMapALehq8fqu6fPNewWxWDxV4a";
  
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

    xhr.setRequestHeader( 'Content-Type',   'application/json' );
    xhr.setRequestHeader( 'Accept', 'application/json' );
    //xhr.setRequestHeader("Authorization", "Bearer " + token); 
    
    xhr.onload = function() {
      if (xhr.status === 200) { //Status 200 is OK
        setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  };

  return(
    <div className="container">
      <h1 id={greeting}>Enter City Name To Get Airport Code</h1>
      
      {displayAction && <p></p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          value={inputValue} 
          onChange={handleChange} 
          placeholder="City Name"
        />
        <b> &nbsp; </b>
        <p><b></b><button type="submit">Submit</button></p>
      </form>
      <p></p>
      <p>The Airport Code for {inputValue} : </p>
      {data ? <div><b>{data.data[0].iataCode}</b></div> : <div>Loading...</div>}

    </div>
    
  )
}

// {data ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>}

export default Reference;