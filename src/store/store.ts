import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./UserSlice";
import { useDispatch, useSelector } from "react-redux";

export const BadgerStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof BadgerStore.getState>;
export type BadgerDispatch = typeof BadgerStore.dispatch;

export const useBadgerDispatch = useDispatch.withTypes<BadgerDispatch>();
export const useBadgerSelector = useSelector.withTypes<RootState>();
