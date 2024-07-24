import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, vocabulary, stats, _delete } from "../../../public/urls";
import { getResponse } from "../../../public/urls";

export const fetchVocabulary = createAsyncThunk("vocabulary/fetchVocabulary", async (page, { dispatch }) => {
    const url = new URL(host + vocabulary);
    const params = new URLSearchParams({
        page,
    });
    url.search = params.toString();
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

export const fetchVocabularyPost = createAsyncThunk("vocabulary/fetchVocabularyPost", async (body, { dispatch }) => {
    const url = new URL(host + vocabulary);

    
    const bodyString = JSON.stringify(body);
    await getResponse(url, "POST", bodyString);

    if (response.ok) {
        const data = await response.json();
        if (data) {
            return data
        }
    } 

});

export const fetchVocabularyDelete = createAsyncThunk("vocabulary/fetchVocabularyDelete", async (body, { dispatch }) => {
    const url = new URL(host + vocabulary + _delete);
    
    const bodyString = JSON.stringify(body);
    await getResponse(url, "DELETE", bodyString);
    
    return

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
        // post
        postLoading: false,
        postError: null
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
            })

            .addCase(fetchVocabularyPost.pending, (state) => {
                state.postLoading = true;
            })
            .addCase(fetchVocabularyPost.fulfilled, (state) => {
                state.postLoading = false;
            })
            .addCase(fetchVocabularyPost.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = action.error.message;
            });
    },
});

export const { vocabularyStatsLoaded, vocabularyLoaded } = vocabularySlice.actions;
export default vocabularySlice.reducer;
