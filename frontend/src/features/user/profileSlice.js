import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "user",
  initialState: {
    profile: {},
  },
  reducers: {
    setProfile: (state, action) => {
      const { user } = action.payload;
      state.profile = user;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;

export const selectCurrentProfile = (state) => state.user.profile;
