import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location } from "@/shared/types/Location";
import { appConfig } from "@/config/appConfig";

interface LocationsState {
    selectedLocation: Location | null,
    favoriteLocations: Location[],
    recentLocations: Location[]
}

const getFavorites = (): Location[] => JSON.parse(localStorage.getItem("locations.favorites") || '[]');
const setFavorites = (value: Location[]) => localStorage.setItem("locations.favorites", JSON.stringify(value));

const getRecentLocations = (): Location[] => JSON.parse(localStorage.getItem("locations.recent") || '[]');
const setRecentLocations = (value: Location[]) => localStorage.setItem("locations.recent", JSON.stringify(value));

const initialState: LocationsState = {
    selectedLocation: null,
    favoriteLocations: getFavorites(),
    recentLocations: getRecentLocations()
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
            setFavorites(resultCollection);
        },
        deleteFavoriteLocation(state, action: PayloadAction<Location>) {
            const resultCollection = state.favoriteLocations.filter(el => el.Key !== action.payload.Key);
            state.favoriteLocations = resultCollection;
            setFavorites(resultCollection);

            locationsSlice.caseReducers.setRecentLocation(state, action);
        },
        clearAllRecentLocations(state) {
            state.recentLocations = [];
            setRecentLocations([]);
        },
        //helpers
        setRecentLocation(state, action: PayloadAction<Location| null>){
            if (action.payload !== null) {
                const otherRecentLocations = state.recentLocations.filter(el => el.Key !== action.payload!.Key);
                const resultCollection = [action.payload, ...otherRecentLocations];
                if (resultCollection.length > appConfig.maxSavedRecentLocations) {
                    resultCollection.slice(-1)
                }
    
                state.recentLocations = resultCollection;
                setRecentLocations(resultCollection);
            }
        }
    },
});

export default locationsSlice.reducer;
export const { setCurrentLocation, setFavoriteLocation, deleteFavoriteLocation, clearAllRecentLocations } = locationsSlice.actions