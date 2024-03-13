import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location } from "@/shared/types/Location";

interface LocationsState {
    selectedLocation: Location | null,
    favoriteLocations: Location[]
}

const getFavorites = (): Location[] => JSON.parse(localStorage.getItem("locations.favorites") || '[]');
const setFavorites = (value: Location[]) => localStorage.setItem("locations.favorites", JSON.stringify(value));

const initialState: LocationsState = {
    selectedLocation: null,
    favoriteLocations: getFavorites()
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
                setFavorites(state.favoriteLocations);
            }
        },
        deleteFavoriteLocation(state, action: PayloadAction<Location>) {
            const resultCollection = state.favoriteLocations
                .filter(el => el.Key !== action.payload.Key);

            state.favoriteLocations = resultCollection;
            setFavorites(state.favoriteLocations);
        }
    },
});

export default locationsSlice.reducer;
export const { setCurrentLocation } = locationsSlice.actions