import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location } from "@/shared/types/Location";

interface LocationsState {
    selectedLocation: Location | null,
    favoriteLocations: Location[],
    recentLocations: Location[]
}

const MaxRecentLocations = 10;

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
        },
        setFavoriteLocation(state, action: PayloadAction<Location>) {
            const found = state.favoriteLocations.some(el => el.Key === action.payload.Key);
            if (!found) {
                const resultCollection = [action.payload, ...state.favoriteLocations];
                state.favoriteLocations = resultCollection;
                setFavorites(resultCollection);
            }
        },
        deleteFavoriteLocation(state, action: PayloadAction<Location>) {
            const resultCollection = state.favoriteLocations
                .filter(el => el.Key !== action.payload.Key);

            state.favoriteLocations = resultCollection;
            setFavorites(resultCollection);
        },
        setRecentLocation(state, action: PayloadAction<Location>) {
            const found = state.recentLocations.some(el => el.Key === action.payload.Key);
            if (!found) {
                const resultCollection = [action.payload, ...state.recentLocations];
                if(resultCollection.length > MaxRecentLocations){
                    resultCollection.slice(-1)
                }

                state.recentLocations = resultCollection;
                setRecentLocations(resultCollection);
            }
        },
        clearAllRecentLocations(state) {
            state.favoriteLocations = [];
            setRecentLocations([]);
        }
    },
});

export default locationsSlice.reducer;
export const { setCurrentLocation } = locationsSlice.actions