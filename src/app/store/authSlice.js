import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isSyncDone: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSyncDone: (state, action) => {
      state.isSyncDone = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser , setSyncDone } = authSlice.actions;
export default authSlice.reducer;
