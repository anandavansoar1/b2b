import apiClient from './apiClient';

export const loginAccount = async (company_code, contact_no) => {
  try {
    const response = await apiClient.post('/accounts/login-account', {
      company_code: parseInt(company_code),
      contact_no: contact_no,
    });
    console.log('LOGIN ACCOUNT RESPONSE:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('LOGIN ACCOUNT ERROR:', error);
    throw error.response ? error.response.data : error.message;
  }
};

export const verifyOtp = async (company_code, contact_no, otp) => {
  try {
    const response = await apiClient.post('/accounts/verify-otp', {
      company_code: parseInt(company_code),
      contact_no: contact_no,
      otp: otp,
    });
    console.log('VERIFY OTP RESPONSE:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('VERIFY OTP ERROR:', error);
    throw error.response ? error.response.data : error.message;
  }
};

export default {
  loginAccount,
  verifyOtp,
};
