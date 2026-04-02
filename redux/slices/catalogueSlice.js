import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import catalogueApi from '../../api/catalogue';

export const fetchCatalogue = createAsyncThunk(
  'catalogue/fetchCatalogue',
  async (_, { rejectWithValue }) => {
    try {
      const data = await catalogueApi.fetchCatalogue();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCatalogueError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalogue.fulfilled, (state, action) => {
        state.loading = false;
        // Support both { data: [...] } and plain array responses
        state.products = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data ?? [];
      })
      .addCase(fetchCatalogue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCatalogueError } = catalogueSlice.actions;
export default catalogueSlice.reducer;
