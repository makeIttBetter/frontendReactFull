import apiClient from 'config/axiosConfig';

const API_URL = '/api/chat/call';

const sendMessage = (message) => {
  return apiClient.post(API_URL, { message }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export default { sendMessage };
