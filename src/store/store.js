import { configureStore } from '@reduxjs/toolkit';
import { blogSlice, uiSlice } from './index';

export const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    ui:   uiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})