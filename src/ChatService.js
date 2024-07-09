// src/ChatService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/chat/call';

const sendMessage = (message) => {
  return axios.post(API_URL, { message }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export default { sendMessage };
