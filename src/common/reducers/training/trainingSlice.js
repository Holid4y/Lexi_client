import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, training, info } from "../../../../public/urls";
import { getResponse } from "../../../../public/urls";

import { trainingLoaded } from "./trainingRoundSlice";

export const fetchTraining = createAsyncThunk("training/fetchTraining", async (type, { dispatch }) => {
    const url = new URL(host + training);

    const params = new URLSearchParams({
        type,
    });
    url.search = params.toString();

    const response = await getResponse(url, "GET")

    // if not no content
    if (response.status !== 204) {
        const data = await response.json();
        if (data) {
            dispatch(trainingLoaded(data));
            return data
        } 
    } else {
        // "слов для повторения нет"
    }

    
});

export const fetchTrainingInfo = createAsyncThunk("training/fetchTrainingInfo", async (_, { dispatch }) => {
    const url = new URL(host + info);

    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(trainingInfoLoaded(data));
            return data;
        }
    }
    
});

export const fetchTrainingPatch = createAsyncThunk("training/fetchTrainingPatch", async ({ type, pk, is_correct }, { dispatch }) => {
    const url = new URL(host + training);

    const params = new URLSearchParams({
        type,
    });
    url.search = params.toString();

    const body = {
        pk: pk,
        is_correct: is_correct,
    };

    const bodyString = JSON.stringify(body);

    await getResponse(url, "PATCH", bodyString)

  
});

const trainingSlice = createSlice({
    name: "training",
    initialState: {
        // info
        count_word_to_training_recognize: null,
        count_word_to_training_reproduce: null,

        viewCountSumm: null,

        patchLoading: false,
        patchError: null,

        loading: false,
        error: null,
    },
    reducers: {
        trainingInfoLoaded: (state, action) => {
            state.count_word_to_training_recognize = action.payload.count_word_to_training_recognize;

            state.count_word_to_training_reproduce = action.payload.count_word_to_training_reproduce;

            state.viewCountSumm = action.payload.count_word_to_training_recognize + action.payload.count_word_to_training_reproduce;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTraining.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTraining.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchTraining.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchTrainingPatch.pending, (state) => {
                state.patchLoading = true;
            })
            .addCase(fetchTrainingPatch.fulfilled, (state) => {
                state.patchLoading = false;
            })
            .addCase(fetchTrainingPatch.rejected, (state, action) => {
                state.patchLoading = false;
                state.patchError = action.error.message;
            })

            .addCase(fetchTrainingInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrainingInfo.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchTrainingInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { trainingInfoLoaded } = trainingSlice.actions;
export default trainingSlice.reducer;
