// utils/tests/testAuth.js
import { authenticate } from '../auth';

const testAuth = async () => {
  try {
    const response = await authenticate();
    // console.log('Authentication successful:', response);
    return response; // Retorna a resposta da autenticação
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error; // Lança o erro para ser tratado onde a função é chamada
  }
};

export default testAuth;
