import { createSlice } from "@reduxjs/toolkit";
import { contractStateType } from "@/types/store";

const initialState: contractStateType = {
  deploymentId: null,
  publicOffers: null,
  accountOffers: null,
  offerIds: null,
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setDeploymentId: (state, action) => {
      state.deploymentId = action.payload;
    },
    setPublicOffers: (state, action) => {
      state.publicOffers = action.payload;
    },
    setAccountOffers: (state, action) => {
      state.accountOffers = action.payload;
    },
    addPublicOffer: (state, action) => {
      state.publicOffers = state.publicOffers
        ? [
            ...state.publicOffers.filter(
              (offer) => offer.id !== action.payload.id
            ),
            action.payload,
          ]
        : [action.payload];
    },
    clearPublicOffers: (state) => {
      state.publicOffers = [];
    },
    addAccountOffer: (state, action) => {
      state.accountOffers = state.accountOffers
        ? [
            ...state.accountOffers.filter(
              (offer) => offer.id !== action.payload.id
            ),
            action.payload,
          ]
        : [action.payload];
    },
    clearAccountOffers: (state) => {
      state.accountOffers = [];
    },
  },
});

export const {
  setDeploymentId,
  setPublicOffers,
  setAccountOffers,
  addPublicOffer,
  clearPublicOffers,
  addAccountOffer,
  clearAccountOffers,
} = contractSlice.actions;

export default contractSlice.reducer;
