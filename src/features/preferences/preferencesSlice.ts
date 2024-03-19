import { appConfig } from "@/config/appConfig";
import { LocalStorageGetString, LocalStorageSetItem } from "@/features/localStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PreferencesState {
    temperatureUnit: string,
    favoriteIcon: string,
}

const temperatureUnitKey = "preferences.temperature.unit";
const favoriteIconKey = "preferences.favorite.icon";

const getTemperatureUnitInitValue = () => {
    const localValue = LocalStorageGetString(temperatureUnitKey);
    if (localValue) {
        const foundValue = appConfig.supportedTemperatureUnits.find(i => i.unit === localValue);
        if (foundValue)
            return foundValue.unit;
    }

    return appConfig.supportedTemperatureUnits[0].unit;
}

const getFavoriteIconInitValue = () => {
    const localValue = LocalStorageGetString(favoriteIconKey);
    if (localValue && appConfig.supportedFavoriteIcons.includes(localValue)) {
        return localValue;
    }

    return appConfig.supportedFavoriteIcons[0];
}

const initialState: PreferencesState = {
    temperatureUnit: getTemperatureUnitInitValue(),
    favoriteIcon: getFavoriteIconInitValue()
}

export const preferencesSlice = createSlice({
    name: "preferences",
    initialState,
    reducers: {
        setTemperatureUnit(state, action: PayloadAction<string>) {
            state.temperatureUnit = action.payload;
            LocalStorageSetItem(temperatureUnitKey, state.temperatureUnit);
        },
        setFavoriteIcon(state, action: PayloadAction<string>) {
            state.favoriteIcon = action.payload;
            LocalStorageSetItem(favoriteIconKey, state.favoriteIcon);
        }
    },
});

export default preferencesSlice.reducer;
export const { setTemperatureUnit, setFavoriteIcon } = preferencesSlice.actions