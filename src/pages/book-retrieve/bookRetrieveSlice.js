import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, books } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (slug, { dispatch }) => {
    
    const url = new URL(host + books + slug);
    
    const response = await fetch(url.toString(), {
      method: "GET",
      ...headers
    });
    const data = await response.json();
    dispatch(bookLoaded(data));
    return data;
  }
);

const bookRetrieveSlice = createSlice({
  name: "book",
  initialState: {
    book: null,
    loading: false,
    error: null,
  },
  reducers: {
    bookLoaded: (state, action) => {
      state.book = action.payload;
    }
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
