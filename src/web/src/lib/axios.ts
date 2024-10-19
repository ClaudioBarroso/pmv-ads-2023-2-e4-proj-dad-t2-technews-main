import axios from 'axios';

const API_BASE_URL = 'http://localhost:5195'; // Your C# API base URL

// Example GET request
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/News`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Example POST request
export const sendData = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/News`, data);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export const loginData = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/User/Login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signUpData = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/User`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};
