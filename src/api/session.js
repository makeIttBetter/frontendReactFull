import apiClient  from 'config/axiosConfig';

export const getSessionList = async () => {
  try {
    const response = await apiClient.get('/sessions/user-sessions');
    // console.log('getSessionList:', response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSessionHistory = async (sessionId) => {
  try {
    const response = await apiClient.get(`/sessions/${sessionId}`);
    console.log('getSessionHistory:', response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createSession = async (title) => {
  try {
    const response = await apiClient.post('/sessions/create', {
      title
    });
    console.log('createSession:', response);
    return response;
  } catch (error) {
    throw error;
  }
};