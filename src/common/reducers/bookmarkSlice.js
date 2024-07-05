import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, bookmarks } from "../../../public/urls";
import { getResponse } from "../../../public/urls";

export const fetchBookmarks = createAsyncThunk("bookmarks/fetchBookmarks", async (_, { dispatch }) => {
    const url = new URL(host + bookmarks);

    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(bookmarkLoaded(data));
        }
    }
    return data;
});

export const fetchBookmarksCreateUpdate = createAsyncThunk("bookmarks/fetchBookmarksCreateUpdate", async ({ bookId, targetPage }, { dispatch }) => {
    const url = new URL(host + bookmarks);

    const body = { 
        book_id: bookId,
        target_page: targetPage,
    }
    const bodyString = JSON.stringify(body);

    const response = await getResponse(url, "POST", bodyString)

    if (response.ok) {
        const data = await response.json();
        if (data) {
            return data
        }
    } 

    return 
});

export const fetchBookmarksDelete = createAsyncThunk("bookmarks/fetchBookmarksDelete", async (bookmarkId, { dispatch }) => {
    const url = new URL(host + bookmarks + bookmarkId);

    const response = await getResponse(url, "DELETE")

    return 

});

const bookmarkSlice = createSlice({
    name: "bookmarks",
    initialState: {
        bookmarks: null,
        loading: false,
        error: null,
    },
    reducers: {
        bookmarkLoaded: (state, action) => {
            state.bookmarks = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookmarks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookmarks.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchBookmarks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { bookmarkLoaded } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
