import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: () => {
    return null;
  },
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setUser } = UserSlice.actions;
export const userReducer = UserSlice.reducer;
