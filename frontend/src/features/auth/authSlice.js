import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("_profile"),
  },
  reducers: {
    setCredential: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("_profile", JSON.stringify(token));
      state.token = token;
    },
    logout: (state, action) => {
      localStorage.removeItem("_profile");
      state.token = null;
    },
  },
});

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
