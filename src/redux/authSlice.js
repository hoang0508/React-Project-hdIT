import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    account: {
      access_token: "",
      refress_token: "",
      username: "",
      image: "",
      role: "",
    },
    isAuthenticated: false,
  },
  reducers: {
    authFetchUser: (state, action) => ({
      ...state,
      account: {
        access_token: action.payload?.DT?.access_token,
        refress_token: action.payload?.DT?.access_token,
        username: action.payload?.DT?.username,
        image: action.payload?.DT?.image,
        role: action.payload?.DT?.role,
      },
      isAuthenticated: true,
    }),
  },
});

export const { authFetchUser } = authSlice.actions;

export default authSlice.reducer;
