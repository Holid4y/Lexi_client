import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, bookmarks } from "../../../public/urls";
import { headers, getResponse } from "../../../public/urls";

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
    const accessToken = localStorage.getItem("access");
    const auth = {
        Authorization: `Beare ${accessToken}`,
    };
    const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
            ...headers,
            ...auth
        },
        body: JSON.stringify({
            book_id: bookId,
            target_page: targetPage,
        }),
    });
    if (response.ok) {
        return;
    } else {
        throw new Error(response.statusText);
    }
});

export const fetchBookmarksDelete = createAsyncThunk("bookmarks/fetchBookmarksDelete", async (bookmarkId, { dispatch }) => {
    const url = new URL(host + bookmarks + bookmarkId);
    const accessToken = localStorage.getItem("access");
    const auth = {
        Authorization: `Beare ${accessToken}`,
    };
    const response = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
            ...headers,
            ...auth
        },
    });

    if (response.status === 204) {
        return;
    } else {
        throw new Error(response.statusText);
    }
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
