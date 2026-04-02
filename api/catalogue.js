import apiClient from './apiClient';

export const fetchCatalogue = async () => {
  try {
    // Standard GET call - headers (Token & Company Code) are handled by apiClient interceptor
    const response = await apiClient.get('/transactions/catalog');
    console.log('CATALOGUE DATA RECEIVED:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('FETCH CATALOGUE ERROR:', error);
    throw error.response ? error.response.data : error.message;
  }
};

export default {
  fetchCatalogue,
};
