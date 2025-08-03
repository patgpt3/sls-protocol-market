import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import contractReducer from "./contractSlice";
import alertsReducer from "./alertsSlice";
import apiDataReducer from "./apiDataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contract: contractReducer,
    alerts: alertsReducer,
    api_data: apiDataReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});
