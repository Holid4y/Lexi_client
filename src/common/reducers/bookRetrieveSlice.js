import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, books } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (params, { dispatch }) => {
    const { slug, page } = params;
    const url = new URL(host + books + slug + "/" + page);

    const response = await fetch(url.toString(), {
      method: "GET",
      ...headers,
    });
    const data = await response.json();
    dispatch(bookLoaded(data));
    return data;
  }
);

const bookRetrieveSlice = createSlice({
  name: "book",
  initialState: {
    pk: null,
    title: null,
    author: null,
    author_upload: null,
    page_count: null,
    slug: null,
    pages: null,
    nextPages: null,
    prevPages: null,

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
      state.slug = action.payload.slug;

      if (!state.pages) {
        state.pages = action.payload.pages;
      } else {
        // колхоз
        state.nextPages = action.payload.pages;
        state.prevPages = action.payload.pages;
      }

    },
    writePages: (state, action) => {
      state.prevPages = state.pages
      state.pages = state.nextPages
      state.nextPages = null
      
    },
    writePrevPages: (state, action) => {
      state.nextPages = state.pages
      state.pages = state.prevPages
      state.prevPages = null

      
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

export const { bookLoaded, writePages, writePrevPages } = bookRetrieveSlice.actions;
export default bookRetrieveSlice.reducer;
