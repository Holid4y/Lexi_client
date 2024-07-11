import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, books } from "../../../public/urls";
import { getResponse } from "../../../public/urls";

export const fetchBook = createAsyncThunk("book/fetchBook", async (params, { dispatch }) => {
    const { slug, page } = params;
    const url = new URL(host + books + slug + "/" + page);

    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(bookLoaded(data));
            const value = {"slug":slug,"page": page};
            localStorage.setItem('recentlyBook', JSON.stringify(value));
        }
    }
    return data;
});

const bookRetrieveSlice = createSlice({
    name: "book",
    initialState: {
        pk: null,
        title: null,
        author: null,
        author_upload: null,
        page_count: null,
        pages_slice: null,
        slice_length: null,
        slug: null,
        pages: null,
        bookmark: null,

        loading: false,
        error: null,
    },
    reducers: {
        bookLoaded: (state, action) => {
            state.pk = action.payload.pk;
            state.title = action.payload.title;
            state.author = action.payload.author;
            state.author_upload = action.payload.author_upload;
            state.page_count = action.payload.page_count;
            state.pages_slice = action.payload.pages_slice;
            state.slice_length = action.payload.slice_length;
            state.slug = action.payload.slug;
            state.pages = action.payload.pages;
            state.bookmark = action.payload.bookmark;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBook.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { bookLoaded } = bookRetrieveSlice.actions;
export default bookRetrieveSlice.reducer;
