import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, books } from "../../../public/urls";
import { headers } from "../../../public/urls";
import { generateExtraReducersFromActions } from "../../common/reducers/extraReducer";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (page, { dispatch }) => {
    const url = new URL(host + books);

    const params = new URLSearchParams({
      page,
    });
    url.search = params.toString();
    const response = await fetch(url.toString(), {
      method: "GET" 
    }); 

    const data = await response.json();
    dispatch(booksLoaded(data));
    return data;
  }
);

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
    }
  },
  extraReducers: generateExtraReducersFromActions(fetchBooks)
});

export const { booksLoaded } = booksSlice.actions;
export default booksSlice.reducer;
