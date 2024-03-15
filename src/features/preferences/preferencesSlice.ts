import { appConfig } from "@/config/appConfig";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PreferencesState {
    temperatureUnit: string,
    favoriteIcon: string,
}

const getTemperatureUnit = () => localStorage.getItem("preferences.temperature.unit") || '';
const setTemperatureUnitToStorage = (value: string) => localStorage.setItem("preferences.temperature.unit", value);

const getFavoriteIcon = () => localStorage.getItem("preferences.favorite.icon") || '';
const setFavoriteIconToStorage = (value: string) => localStorage.setItem("preferences.favorite.icon", value);

const initialState: PreferencesState = {
    temperatureUnit: appConfig.supportedTemperatureUnits.some(i => i.unit === getTemperatureUnit()) ? getTemperatureUnit() : appConfig.supportedTemperatureUnits[0].unit,
    favoriteIcon:  appConfig.supportedFavoriteIcons.includes(getFavoriteIcon()) ? getFavoriteIcon() : appConfig.supportedFavoriteIcons[0]
}

export const preferencesSlice = createSlice({
    name: "preferences",
    initialState,
    reducers: {
        setTemperatureUnit(state, action: PayloadAction<string>) {
            state.temperatureUnit = action.payload;
            setTemperatureUnitToStorage(state.temperatureUnit);
        },
        setFavoriteIcon(state, action: PayloadAction<string>) {
            state.favoriteIcon = action.payload;
            setFavoriteIconToStorage(state.favoriteIcon);
        }
    },
});

export default preferencesSlice.reducer;
export const { setTemperatureUnit } = preferencesSlice.actions