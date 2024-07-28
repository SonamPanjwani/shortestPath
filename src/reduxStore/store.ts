import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./displaySlice";
import gridReducer from "./gridSlice";
import runReducer from "./runSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    display: displayReducer,
    grid: gridReducer,
    run: runReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
