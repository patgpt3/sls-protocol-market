"use client";
import { createSlice } from "@reduxjs/toolkit";
import { AlertsType } from "../components/services/store";

const initialState: AlertsType = [];

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
