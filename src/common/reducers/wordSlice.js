import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, words } from "../../../public/urls";
import { headers, getResponse } from "../../../public/urls";

export const fetchWordGet = createAsyncThunk("word/fetchWordGet", async (pk, { dispatch }) => {
    const url = new URL(host + words + pk);

    const response = await getResponse(url, "GET")

    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(wordGetLoaded(data));
        }
    }

    return data;
});

export const fetchWordPost = createAsyncThunk("word/fetchWordPost", async (word, { dispatch }) => {
    const url = new URL(host + words);

    const body = { word: word }
    const bodyString = JSON.stringify(body);

    const response = await getResponse(url, "POST", bodyString)

    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(wordPostLoaded(data));
        }
    }

    return data;

});

const wordSlice = createSlice({
    name: "word",
    initialState: {
        pk: null,
        text: null,
        part_of_speech: null,
        transcription: null,
        translations: null,
        synonyms: null,
        meanings: null,

        // WordBlockTranslation
        isVisible: false,

        loading: false,
        error: null,
    },
    reducers: {
        wordGetLoaded: (state, action) => {
            state.pk = action.payload.pk;
            state.text = action.payload.text;
            state.part_of_speech = action.payload.part_of_speech;
            state.transcription = action.payload.transcription;
            state.translations = action.payload.translations;
            state.synonyms = action.payload.synonyms;
            state.meanings = action.payload.meanings;
        },
        wordPostLoaded: (state, action) => {
            state.pk = action.payload.word.pk;
            state.text = action.payload.word.text;
            state.part_of_speech = action.payload.word.part_of_speech;
            state.transcription = action.payload.word.transcription;
            state.translations = action.payload.word.translations;
            state.synonyms = action.payload.word.synonyms;
            state.meanings = action.payload.word.meanings;
        },
        toggleWordBlock: (state, action) => {
            state.isVisible = !state.isVisible;
        },
        cleanStateWord: (state, action) => {
            state.pk = null;
            state.text = null;
            state.part_of_speech = null;
            state.transcription = null;
            state.translations = null;
            state.synonyms = null;
            state.meanings = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWordGet.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWordGet.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchWordGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchWordPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWordPost.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchWordPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { wordGetLoaded, wordPostLoaded, toggleWordBlock, cleanStateWord } = wordSlice.actions;
export default wordSlice.reducer;
