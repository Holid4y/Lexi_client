import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, stats, vocabulary, recently_words } from "../../../public/urls";
import { getResponse } from "../../../public/urls";


export const fetchVocabularyStats = createAsyncThunk("stats/fetchVocabularyStats", async (_, { dispatch }) => {
    const url = new URL(host + stats + vocabulary);

    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(vocabularyStatsLoaded(data));
        }
    }
    
    return data;
});

export const fetchRecentlyWords = createAsyncThunk("stats/fetchRecentlyWords", async (_, { dispatch }) => {
    const url = new URL(host + stats + recently_words);

    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(recentlyWordsLoaded(data));
        }
    }
    
    return data;
});


const statsSlice = createSlice({
    name: "vocabulary",
    initialState: {
        // stats
        recognize: [],
        reproduce: [],
        // recently_words
        recently_added_words: [],
        // other
        loading: false,
        error: null,
    },
    reducers: {
        vocabularyStatsLoaded: (state, action) => {
            state.recognize = action.payload.recognize;
            state.reproduce = action.payload.reproduce;
        },
        recentlyWordsLoaded: (state, action) => {
            state.recently_added_words = action.payload;
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
            });
    },
});

export const { vocabularyStatsLoaded, recentlyWordsLoaded } = statsSlice.actions;
export default statsSlice.reducer;