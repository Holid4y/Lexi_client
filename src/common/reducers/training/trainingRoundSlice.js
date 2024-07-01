import { createSlice } from "@reduxjs/toolkit";
import { training } from "../../../../public/urls";

const reproduceSlice = createSlice({
    name: "trainingRound",
    initialState: {
        // common
        training: null,
        round: 0,
        score: 0,
        isEnd: false,

        // one round state
        answer: null,
        isViewResult: false,
        isCorrect: null,

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
        },
        throwOneRoundState: (state, action) => {
            // выполнять при ответе страницы
            state.answer = null;
            state.isViewResult = false;
            state.isCorrect = null;
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
        // isEnd
        setIsEnd: (state, action) => {
            state.isEnd = action.payload;
        },
        // isViewResult
        setIsViewResult:(state, action) => {
            state.isViewResult = action.payload;
        },
        // isCorrect
        setIsCorrect: (state, action) => {
            state.isCorrect = action.payload;
        },
        
    },
});

export const { 
    trainingLoaded, 
    throwState, 
    throwOneRoundState,
    nextRound, 
    clearRound, 
    addScore, 
    clearScore, 
    setHintIsOpen, 
    setAnswer,
    setIsEnd,
    setIsViewResult,
    setIsCorrect 
} = reproduceSlice.actions;
export default reproduceSlice.reducer;
