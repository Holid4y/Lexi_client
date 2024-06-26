import { createSlice } from "@reduxjs/toolkit";

const reproduceSlice = createSlice({
    name: "reproduce",
    initialState: {
        reproduce: null,
        round: 0,
        score: 0,
    },
    reducers: {
        reproduceLoaded: (state, action) => {
            state.reproduce = action.payload;
        },
        clearTraining: (state, action) => {
            state.reproduce = null;
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

export const { reproduceLoaded, clearTraining, nextRound, clearRound, addScore, clearScore } = reproduceSlice.actions;
export default reproduceSlice.reducer;
