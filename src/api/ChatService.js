import apiClient from 'config/axiosConfig';

const API_URL = '/api/chat/call';

export const sendChat = (message, sessionId) => {
  return apiClient.post(API_URL, { 
    message,
    sessionId
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getChatHistory = async (sessionId) => {
  try {
    const response = await apiClient.get(`/messages/session/${sessionId}`);
    // console.log('getChatHistory:', response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const storeChat = async (sessionId, content, messageType) => {
  try {
    const response = await apiClient.post('/messages', {
      sessionId,
      content,
      messageType
    });
    // console.log('storeChat:', response);
    return response;
  } catch (error) {
    throw error;
  }
};