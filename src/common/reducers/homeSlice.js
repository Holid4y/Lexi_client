import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, home } from "../../../public/urls";
// import { headers } from "../../../public/urls";
import { getResponse } from "../../../public/urls";


export const fetchHome = createAsyncThunk("home/fetchHome", async (_, { dispatch }) => {
    const url = new URL(host + home);
    

    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(homeLoaded(data));
        }
    }
    return data;
});

const homeSlice = createSlice({
    name: "home",
    initialState: {
        count_recognize_to_learn: null,
        count_reproduce_to_learn: null,
        learning_words: null,
        new_words_today: null,
        upload_books: null,

        loading: false,
        error: null,
    },
    reducers: {
        homeLoaded: (state, action) => {
            state.count_recognize_to_learn = action.payload.count_recognize_to_learn;
            state.count_reproduce_to_learn = action.payload.count_reproduce_to_learn;
            state.learning_words = action.payload.learning_words;
            state.new_words_today = action.payload.new_words_today;
            state.upload_books = action.payload.upload_books;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHome.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHome.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchHome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { homeLoaded } = homeSlice.actions;
export default homeSlice.reducer;
