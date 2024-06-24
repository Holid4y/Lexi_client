import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: "pagination",
    initialState: 1,
    reducers: {
        incrementPage: (state) => state + 1,
        decrementPage: (state) => state - 1,
    },
});

export const { incrementPage, decrementPage } = paginationSlice.actions;
export default paginationSlice.reducer;
