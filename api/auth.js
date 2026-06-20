import apiClient from './apiClient';

export const loginAccount = async (company_code, contact_no) => {
  console.log('MOCK LOGIN:', { company_code, contact_no });
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "OTP Sent Successfully" };
};

export const verifyOtp = async (company_code, contact_no, otp) => {
  console.log('MOCK VERIFY OTP:', { company_code, contact_no, otp });
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    token: `mock-token-${Math.random()}`,
    user: {
      id: 999,
      company_code: company_code,
      contact_no: contact_no,
      name: 'Test User'
    }
  };
};

export default {
  loginAccount,
  verifyOtp,
};
