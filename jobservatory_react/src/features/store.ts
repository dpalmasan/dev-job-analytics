import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { detailReducer } from './detail/reducer';
import thunk from 'redux-thunk';

/* istanbul ignore file */
export const store = configureStore({
  reducer: {
    detail: detailReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

/* istanbul ignore file */
export type RootState = ReturnType<typeof store.getState>;
