import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '@/features/locations/locationSlice'
import { locationsApi } from '@/features/locations/locationsApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [locationsApi.reducerPath]: locationsApi.reducer,
    locations: locationsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(locationsApi.middleware),
});

setupListeners(store.dispatch)