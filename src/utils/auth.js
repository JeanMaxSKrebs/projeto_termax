// utils/auth.js
import axios from 'axios';
import base64 from 'base-64'; // Importe a biblioteca base-64

const API_KEY = '8e78a6d16dfc4a609958bc4cbc7132b4';
const API_URL = 'https://api.nitrotranslate.com/v1/account';

export const authenticate = async () => {
  try {
    const authHeader = `Basic ${base64.encode(`${API_KEY}:`)}`;
    
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
    });

    if (response.status === 200) {
    //   console.log('Authentication successful:', response.data);
      // Retorna o token ou qualquer outro dado necessário
      return response.data;
    } else {
      throw new Error(`Authentication failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error during authentication:', error.response?.data || error.message);
    throw error;
  }
};
