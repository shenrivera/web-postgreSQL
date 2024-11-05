import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getForms = async () => {
  try {
    const response = await axios.get(`${API_URL}/forms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

export const checkDatabaseConnection = async () => {
  try {
    const response = await axios.get(`${API_URL}/status`);
    return response.data;
  } catch (error) {
    console.error('Error checking database connection:', error);
    throw error;
  }
};