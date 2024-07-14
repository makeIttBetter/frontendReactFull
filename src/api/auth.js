import apiClient  from 'config/axiosConfig';

export const signUp = async (username, email, password) => {
  try {
    const response = await apiClient.post('/api/auth/signup', {
      'username': username,
      'email': email,
      'password': password
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const SignIn = async (username, password) => {
  try {
    const response = await apiClient.post('/api/auth/login', {
      'username': username,
      'password': password
    });
    return response;
  } catch (error) {
    throw error;
  }
};