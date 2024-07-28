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

export const createSession = async (title) => {
  try {
    const response = await apiClient.post('/sessions', {
      title
    });
    // console.log('createSession:', response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSession = async (sessionId) => {
  try {
    const response = await apiClient.delete(`/sessions/${sessionId}`);
    // console.log('deleteSession:', response);
    return response;
  } catch (error) {
    throw error;
  }
}

export const updateSession = async (sessionId, title) => {
  try {
    const response = await apiClient.put(`/sessions/${sessionId}`, {
      title
    });
    // console.log('updateSession:', response);
    return response;
  } catch (error) {
    throw error;
  }
}