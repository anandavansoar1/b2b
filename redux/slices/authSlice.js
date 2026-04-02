import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk(
  'auth/login',
  async ({ companyCode, phoneNumber }, { rejectWithValue }) => {
    try {
      const data = await authApi.loginAccount(companyCode, phoneNumber);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async ({ companyCode, phoneNumber, otp }, { rejectWithValue }) => {
    try {
      const data = await authApi.verifyOtp(companyCode, phoneNumber, otp);
      if (data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('companyCode', companyCode.toString());
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    lastPhoneNumber: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem('userToken');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.lastPhoneNumber = action.meta.arg.phoneNumber;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify
      .addCase(verify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(verify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
