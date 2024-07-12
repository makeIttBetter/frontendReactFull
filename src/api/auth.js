import axios from 'axios';

export const signUp = async (username, email, password) => {
    try {
      const response = await axios.post('/api/auth/signup', {
        'username': username,
        'email': email,
        'password': password
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

export const SignIn = async (email, password) => {
  try {
    const response = await axios.post('/login', {
      'username': email,
      'password': password
    });
    return response;
  } catch (error) {
    throw error;
  }
};