import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: []

};

const slice = createSlice({
    name: "authType",
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },


    },
});

// Reducer
export default slice.reducer;

// Actions
export const { onOpenModal, onCloseModal, selectApptType } = slice.actions;

// ----------------------------------------------------------------------
