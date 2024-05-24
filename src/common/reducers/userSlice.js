import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, bookmarks } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchUser = createAsyncThunk(
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
      console.log(data)
      return data;
       
    } catch (error) {
      if (error.message === "Unauthorized") {
        console.log("Ошибка 401: Unauthorized");
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
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

export const { bookmarkLoaded } = userSlice.actions;
export default userSlice.reducer;
