import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  isAuth: false,
  nonce: "",
  signinMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setNonce: (state, action) => {
      state.nonce = action.payload;
    },
    setSigninMessage: (state, action) => {
      state.signinMessage = action.payload;
    },
  },
});

export const { setIsConnected, setIsAuth, setNonce, setSigninMessage } =
  authSlice.actions;

export default authSlice.reducer;
