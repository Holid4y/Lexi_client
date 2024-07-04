import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, vocabulary, stats } from "../../../public/urls";
import { getResponse } from "../../../public/urls";

export const fetchVocabulary = createAsyncThunk("vocabulary/fetchVocabulary", async (_, { dispatch }) => {
    const url = new URL(host + vocabulary);

    const response = await getResponse(url, "GET");

    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(vocabularyLoaded(data));
        }
    }

    return data;
});
export const fetchVocabularyStats = createAsyncThunk("vocabulary/fetchVocabularyStats", async (_, { dispatch }) => {
    const url = new URL(host + stats);

    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(vocabularyStatsLoaded(data));
        }
    }
    
    return data;
});

const vocabularySlice = createSlice({
    name: "vocabulary",
    initialState: {
        // vocabulary
        words: null,
        // stats
        recognize: [],
        reproduce: [],
        // other
        loading: false,
        error: null,
    },
    reducers: {
        vocabularyStatsLoaded: (state, action) => {
            state.recognize = action.payload.recognize;
            state.reproduce = action.payload.reproduce;
        },
        vocabularyLoaded: (state, action) => {
            state.words = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVocabularyStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVocabularyStats.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchVocabularyStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchVocabulary.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVocabulary.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchVocabulary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { vocabularyStatsLoaded, vocabularyLoaded } = vocabularySlice.actions;
export default vocabularySlice.reducer;
