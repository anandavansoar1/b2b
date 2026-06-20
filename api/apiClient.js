import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://dort.theworkpc.com/api';
// export const BASE_URL = 'http://192.168.1.71:5001/api'; // dev URL from kitty

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically add Auth token and Company Code to headers
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const companyCode = await AsyncStorage.getItem('companyCode');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (companyCode) {
      const parsedCompanyCode = parseInt(companyCode);
      // Sending company code as a header
      config.headers['x-company-code'] = companyCode;
      
      // Also inject into body for backend middleware (loginProtect) that expects it there
      if (config.method === 'get') {
        config.data = { company_code: parsedCompanyCode };
        // Fallback for some routes that might check query params
        config.params = { ...config.params, company_code: parsedCompanyCode };
      } else if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
        config.data.company_code = parsedCompanyCode;
      }
    }
  } catch (error) {
    console.error('Error fetching data from AsyncStorage', error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
