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

        // recognize
        selectedLable: null,

        // reproduce
        hintIsOpen: false,
        hintTextListTuple: null
    },
    reducers: {
        trainingLoaded: (state, action) => {
            state.training = action.payload;
        },
        setSelectedLable: (state, action) => {
            state.selectedLable = action.payload;
        },
        throwState: (state) => {
            // выполнять при последней страницы
            state.training = null;
            state.round = 0;
        },
        throwOneRoundState: (state) => {
            // выполнять при ответе страницы
            state.answer = null;
            state.isViewResult = false;
            state.isCorrect = null;
            state.selectedLable = null
        },
        // round
        nextRound: (state) => {
            state.round = state.round + 1;
        },
        clearRound: (state, action) => {
            // выполнять при покидании endpage 
            state.round = 0;
        },
        // score
        addScore: (state) => {
            state.score = state.score + 1;
        },
        clearScore: (state) => {
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
        setHintTextListTuple: (state, action) => {
            state.hintTextListTuple = action.payload;
        },
        
    },
});

export const { 
    trainingLoaded, 
    setSelectedLable,
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
    setIsCorrect,
    setHintTextListTuple 
} = reproduceSlice.actions;
export default reproduceSlice.reducer;
