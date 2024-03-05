import { createSlice } from "@reduxjs/toolkit";

interface LocationsState {
    locations: String[];
    search: '';
}

const initialState: LocationsState = {
    locations: [],
    search: '',
}

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
    //   getUsersStart(state) {
    //     state.loading = true;
    //   },
    //   getUsersSuccess(state, action: PayloadAction<User[]>) {
    //     state.users = action.payload;
    //     state.loading = false;
    //     state.error = null;
    //   },
    //   getUsersFailure(state, action: PayloadAction<string>) {
    //     state.loading = false;
    //     state.error = action.payload;
    //   },
    },
  });

  export default locationsSlice.reducer;