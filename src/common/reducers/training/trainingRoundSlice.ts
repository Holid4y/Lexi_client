import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainingItem } from "../../../pages/training/common/training";


interface TrainingRoundState {
    // common
    training: TrainingItem[] | null;
    round: number | 0;
    score: number | 0;
    isEnd: boolean;

    // one round state
    answer: string | null;
    isViewResult: boolean;
    isCorrect: boolean | null;

    // recognize
    selectedLable: number | null,

    // hint
    hintIsOpen: boolean;
    hintTextListTuple: any | null;
}

const initialState: TrainingRoundState = {
    training: null,
    round: 0,
    score: 0,
    isEnd: false,
    answer: null,
    isViewResult: false,
    isCorrect: null,
    selectedLable: null,
    hintIsOpen: false,
    hintTextListTuple: null,
};

const reproduceSlice = createSlice({
    name: "trainingRound",
    initialState,
    reducers: {
        trainingLoaded: (state, action: PayloadAction<TrainingItem[]>) => {
            state.training = action.payload;
        },
        throwState: (state) => {
            state.training = null;
            state.round = 0;
        },
        setSelectedLable: (state, action: PayloadAction<number>) => {
            state.selectedLable = action.payload;
        },
        throwOneRoundState: (state) => {
            state.answer = null;
            state.isViewResult = false;
            state.isCorrect = null;
            state.selectedLable = null
        },
        nextRound: (state) => {
            state.round += 1;
        },
        clearRound: (state) => {
            state.round = 0;
        },
        addScore: (state) => {
            state.score += 1;
        },
        clearScore: (state) => {
            state.score = 0;
        },
        setHintIsOpen: (state, action: PayloadAction<boolean>) => {
            state.hintIsOpen = action.payload;
        },
        setAnswer: (state, action: PayloadAction<string | null>) => {
            state.answer = action.payload;
        },
        setIsEnd: (state, action: PayloadAction<boolean>) => {
            state.isEnd = action.payload;
        },
        setIsViewResult: (state, action: PayloadAction<boolean>) => {
            state.isViewResult = action.payload;
        },
        setIsCorrect: (state, action: PayloadAction<boolean>) => {
            state.isCorrect = action.payload;
        },
        setHintTextListTuple: (state, action: PayloadAction<any | null>) => {
            state.hintTextListTuple = action.payload;
        },
    },
});

export const { 
    trainingLoaded, 
    throwState, 
    setSelectedLable,
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