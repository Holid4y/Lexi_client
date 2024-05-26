import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, bookmarks } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchBookmarks",
  async (_, { dispatch }) => {
    const url = new URL(host + bookmarks);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const data = await response.json();
      dispatch(bookmarkLoaded(data));
      return data;
       
    } catch (error) {
      if (error.message === "Unauthorized") {
        console.log("Ошибка 401: Unauthorized");
      }
    }
  }
);

export const fetchBookmarksCreateUpdate = createAsyncThunk(
  "auth/fetchLogin",
  async ({ bookId, targetPage }, { dispatch }) => {
    const url = new URL(host + bookmarks);
    console.log('создаю закладку')
    console.log(JSON.stringify({
      book_id: bookId,
      target_page: targetPage,
    }))
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        ...headers,
      },
      body: JSON.stringify({
        book_id: bookId,
        target_page: targetPage,
      }),
    });

    if (response.ok) {
      console.log(response)
      return 
    } else {
      throw new Error(response.statusText);
    }
  }
);

const bookmarkListSlice = createSlice({
  name: "bookmarks",
  initialState: {
    bookmarks: null,
    loading: false,
    error: null
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

export const { bookmarkLoaded } = bookmarkListSlice.actions;
export default bookmarkListSlice.reducer;
