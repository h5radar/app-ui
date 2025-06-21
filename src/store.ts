import { configureStore } from "@reduxjs/toolkit";

import { accountUserReducer } from "@/slices/account-user";
import { radarUserReducer } from "@/slices/radar-user";

export const store = configureStore({
  reducer: {
    accountUser: accountUserReducer,
    radarUser: radarUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
