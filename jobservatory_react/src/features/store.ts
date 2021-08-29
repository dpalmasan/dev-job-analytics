import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { detailReducer } from "./detail/reducer";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    detail: detailReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

export type RootState = ReturnType<typeof store.getState>;
