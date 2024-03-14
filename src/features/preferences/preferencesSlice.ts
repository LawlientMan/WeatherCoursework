import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const AvailableFavoriteIcons = ['duckStar', 'star'];
interface PreferencesState {
    temperatureUnit: string,
    favoriteIcon: string,
}

const getTemperatureUnit = (): string => localStorage.getItem("preferences.temperature.unit") || 'C';
const setTemperatureUnitToStorage = (value: string) => localStorage.setItem("preferences.temperature.unit", value);

const getFavoriteIcon = (): string => localStorage.getItem("preferences.favorite.icon") || '';
const setFavoriteIconToStorage = (value: string) => localStorage.setItem("preferences.favorite.icon", value);


const initialState: PreferencesState = {
    temperatureUnit: getTemperatureUnit(),
    favoriteIcon:  AvailableFavoriteIcons.includes(getFavoriteIcon()) ? getFavoriteIcon() : AvailableFavoriteIcons[0]
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