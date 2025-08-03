import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiPublicOffers: null,
};

export const apiDataSlice = createSlice({
  name: "api_data",
  initialState,
  reducers: {
    setApiPublicOffers: (state, action) => {
      state.apiPublicOffers = action.payload;
    },
  },
});

export const { setApiPublicOffers } = apiDataSlice.actions;

export default apiDataSlice.reducer;
