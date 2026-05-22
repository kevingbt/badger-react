import { configureStore } from "@reduxjs/toolkit"
import { tokenReducer } from "./TokenSlice"
import { useDispatch, useSelector } from "react-redux"

export const BadgerStore = configureStore({
    reducer:{
        token: tokenReducer
    }
})

export type RootState = ReturnType<typeof BadgerStore.getState>
export type BadgerDispatch = typeof BadgerStore.dispatch

export const useBadgerDispatch = useDispatch.withTypes<BadgerDispatch>()
export const useBadgerSelector = useSelector.withTypes<RootState>()