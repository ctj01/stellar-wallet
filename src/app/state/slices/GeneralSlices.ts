import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLoading, setError, setData } = generalSlice.actions;
export const GeneralReducer = generalSlice.reducer;