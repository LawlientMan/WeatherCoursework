import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PreferencesState {
    temperatureUnit: string,
}

const getTemperatureUnit = (): string => localStorage.getItem("preferences.temperature.unit") || 'C';
const setTemperatureUnitToStorage = (value: string) => localStorage.setItem("preferences.temperature.unit", value);

const initialState: PreferencesState = {
    temperatureUnit: getTemperatureUnit(),
}

export const preferencesSlice = createSlice({
    name: "preferences",
    initialState,
    reducers: {
        setTemperatureUnit(state, action: PayloadAction<string>) {
            state.temperatureUnit = action.payload;
            setTemperatureUnitToStorage(state.temperatureUnit);
        }
    },
});

export default preferencesSlice.reducer;
export const { setTemperatureUnit } = preferencesSlice.actions