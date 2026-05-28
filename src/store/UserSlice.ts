import { createSlice } from "@reduxjs/toolkit";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

export const UserSlice = createSlice({
  name: "user",
  initialState: () => {
    return getUserFromToken();
  },
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setUser } = UserSlice.actions;
export const userReducer = UserSlice.reducer;
