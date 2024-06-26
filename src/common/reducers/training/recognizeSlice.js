import { createSlice } from "@reduxjs/toolkit";

const recognizeSlice = createSlice({
    name: "recognize",
    initialState: {
        recognize: null,
        round: 0,
        score: 0,
    },
    reducers: {
        recognizeLoaded: (state, action) => {
            state.recognize = action.payload;
        },
        clearTraining: (state, action) => {
            state.recognize = null;
        },

        nextRound: (state, action) => {
            state.round = state.round + 1;
        },
        clearRound: (state, action) => {
            state.round = 0;
        },

        addScore: (state, action) => {
            state.score = state.score + 1;
        },
        clearScore: (state, action) => {
            state.score = 0;
        },
    },
});

export const { recognizeLoaded, clearTraining, nextRound, clearRound, addScore, clearScore } = recognizeSlice.actions;
export default recognizeSlice.reducer;
