import { createSlice } from "@reduxjs/toolkit";
import { training } from "../../../../public/urls";

const reproduceSlice = createSlice({
    name: "trainingRound",
    initialState: {
        training: null,
        round: 0,
        score: 0,
        answer: null,

        // hint
        hintIsOpen: false,
    },
    reducers: {
        trainingLoaded: (state, action) => {
            state.training = action.payload;
        },
        throwState: (state, action) => {
            // выполнять при последней страницы
            state.training = null;
            state.round = 0;
            state.answer = null;
        },
        // round
        nextRound: (state, action) => {
            state.round = state.round + 1;
        },
        clearRound: (state, action) => {
            // выполнять при покидании endpage 
            state.round = 0;
        },
        // score
        addScore: (state, action) => {
            state.score = state.score + 1;
        },
        clearScore: (state, action) => {
            state.score = 0;
        },
        // hint
        setHintIsOpen: (state, action) => {
            state.hintIsOpen = action.payload;
        },
        // answer
        setAnswer: (state, action) => {
            state.answer = action.payload;
        },
    },
});

export const { 
    trainingLoaded, 
    throwState, 
    nextRound, 
    clearRound, 
    addScore, 
    clearScore, 
    setHintIsOpen, 
    setAnswer 
} = reproduceSlice.actions;
export default reproduceSlice.reducer;
