import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, words } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchWordGet = createAsyncThunk(
  "word/fetchWordGet",
  async (pk, { dispatch }) => {
    const url = new URL(host + words + pk);
    
    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const data = await response.json();
      dispatch(wordLoaded(data));
      return data;
       
    } catch (error) {
      if (error.message === "Unauthorized") {
        console.log("Ошибка 401: Unauthorized");
      }
      console.log(error)
    }
  }
);

export const fetchBookmarksCreateUpdate = createAsyncThunk(
  "bookmarks/fetchBookmarksCreateUpdate",
  async ({ bookId, targetPage }, { dispatch }) => {
    const url = new URL(host + bookmarks);
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
      return 
    } else {
      throw new Error(response.statusText);
    }
  }
);

export const fetchBookmarksDelete = createAsyncThunk(
  "bookmarks/fetchBookmarksDelete",
  async (bookmarkId, { dispatch }) => {
    const url = new URL(host + bookmarks + bookmarkId);
    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        ...headers,
      },
    });

    if (response.status === 204) {
      return 
    } else {
      throw new Error(response.statusText);
    }
  }
);

const wordSlice = createSlice({
  name: "word",
  initialState: {
    pk: null,
    text: null,
    part_of_speech: null,
    transcription: null,
    translations: null,
    synonyms: null,
    meanings: null,

    loading: false,
    error: null
  },
  reducers: {
    wordLoaded: (state, action) => {
      state.pk = action.payload.pk;
      state.text = action.payload.text;
      state.part_of_speech = action.payload.part_of_speech;
      state.transcription = action.payload.transcription;
      state.translations = action.payload.translations;
      state.synonyms = action.payload.synonyms;
      state.meanings = action.payload.meanings;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordGet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWordGet.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchWordGet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { wordLoaded } = wordSlice.actions;
export default wordSlice.reducer;
