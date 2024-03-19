import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location } from "@/shared/types/Location";
import { appConfig } from "@/config/appConfig";
import { LocalStorageGetItem, LocalStorageSetItem } from "@/features/localStorage";

interface LocationsState {
    selectedLocation: Location | null,
    favoriteLocations: Location[],
    recentLocations: Location[]
}

const favoriteLocationKey = "locations.favorites";
const recentLocationKey = "locations.recent";

const initialState: LocationsState = {
    selectedLocation: null,
    favoriteLocations: LocalStorageGetItem(favoriteLocationKey, []),
    recentLocations: LocalStorageGetItem(recentLocationKey, [])
}

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        setCurrentLocation(state, action: PayloadAction<Location | null>) {
            state.selectedLocation = action.payload;
            locationsSlice.caseReducers.setRecentLocation(state, action);
        },
        setFavoriteLocation(state, action: PayloadAction<Location>) {
            const resultCollection = [action.payload, ...state.favoriteLocations.filter(el => el.Key !== action.payload.Key)];
            state.favoriteLocations = resultCollection;
            LocalStorageSetItem(favoriteLocationKey, resultCollection);
        },
        deleteFavoriteLocation(state, action: PayloadAction<Location>) {
            const resultCollection = state.favoriteLocations.filter(el => el.Key !== action.payload.Key);
            state.favoriteLocations = resultCollection;
            LocalStorageSetItem(favoriteLocationKey, resultCollection);

            locationsSlice.caseReducers.setRecentLocation(state, action);
        },
        clearAllRecentLocations(state) {
            state.recentLocations = [];
            LocalStorageSetItem(recentLocationKey, null);
        },
        setRecentLocation(state, action: PayloadAction<Location | null>) {
            if (action.payload !== null) {
                const otherRecentLocations = state.recentLocations.filter(el => el.Key !== action.payload!.Key);
                const resultCollection = [action.payload, ...otherRecentLocations];
                if (resultCollection.length > appConfig.maxSavedRecentLocations) {
                    resultCollection.slice(-1)
                }

                state.recentLocations = resultCollection;
                LocalStorageSetItem(recentLocationKey, resultCollection);
            }
        }
    },
});

export default locationsSlice.reducer;
export const { setCurrentLocation, setFavoriteLocation, deleteFavoriteLocation, clearAllRecentLocations } = locationsSlice.actions