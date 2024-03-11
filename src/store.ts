import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '@/features/locations/locationSlice'
import { locationsApi } from '@/features/locations/locationsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { weatherApi } from '@/features/weather/weatherApi';

export const store = configureStore({
  reducer: {
    [locationsApi.reducerPath]: locationsApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    locations: locationsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(locationsApi.middleware)
      .concat(weatherApi.middleware),
});

setupListeners(store.dispatch)

export type IRootState = ReturnType<typeof store.getState>
export default store;