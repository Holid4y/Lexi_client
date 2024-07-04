import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, books } from "../../../public/urls";
import { getResponse } from "../../../public/urls";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async (page, { dispatch }) => {
    const url = new URL(host + books);

    const params = new URLSearchParams({
        page,
    });
    url.search = params.toString();
    
    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(booksLoaded(data));
        }
    }
    return data;
});

const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: null,
        loading: false,
        error: null,
    },
    reducers: {
        booksLoaded: (state, action) => {
            state.books = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { booksLoaded } = booksSlice.actions;
export default booksSlice.reducer;
