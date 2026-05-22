import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: () => {
    return localStorage.getItem("token") || "";
  },
  reducers: {
    setToken: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
