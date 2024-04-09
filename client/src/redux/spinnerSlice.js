import { createSlice } from "@reduxjs/toolkit";

//Create spinner slice
export const spinnerSlice = createSlice({
  name: "spinner",
  initialState: {
    loading: false,
  },
  reducers: {
    // Reducer function to set loading to true
    showLoading: (state) => {
      state.loading = true;
    },
    // Reducer function to set loading to false
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = spinnerSlice.actions;
