import { configureStore } from "@reduxjs/toolkit";
import { climateSlice } from "../features/climateslice";

export const store = configureStore({
  reducer: {
    climate: climateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
