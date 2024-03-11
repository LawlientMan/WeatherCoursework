import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location } from "@/shared/types/Location";

interface LocationsState {
    selectedLocation: Location | null
}

const initialState: LocationsState = {
    selectedLocation: null,
}

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        setCurrentLocation(state, action: PayloadAction<Location | null>) {
            state.selectedLocation = action.payload;
        }
    },
});

export default locationsSlice.reducer;
export const { setCurrentLocation } = locationsSlice.actions