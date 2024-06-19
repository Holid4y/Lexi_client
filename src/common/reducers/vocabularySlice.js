import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, vocabulary, stats } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchVocabulary = createAsyncThunk(
  "vocabulary/fetchVocabulary",
  async (_, { dispatch }) => {
    const url = new URL(host + vocabulary);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const data = await response.json();
      dispatch(vocabularyLoaded(data))
      return data;
       
    } catch (error) {
      if (error.message === "Unauthorized") {
        console.log("Ошибка 401: Unauthorized");
      }
    }
  }
);
export const fetchVocabularyStats = createAsyncThunk(
  "vocabulary/fetchVocabularyStats",
  async (_, { dispatch }) => {
    const url = new URL(host + stats);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const data = await response.json();
      dispatch(vocabularyStatsLoaded(data));
      return data;
       
    } catch (error) {
      if (error.message === "Unauthorized") {
        console.log("Ошибка 401: Unauthorized");
      }
    }
  }
);


const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState: {
    // vocabulary
    words: null,
    // stats
    recognize: [],
    reproduce: [],
    // other
    loading: false,
    error: null
  },
  reducers: {
    vocabularyStatsLoaded: (state, action) => {
      state.recognize = action.payload.recognize;
      state.reproduce = action.payload.reproduce;
    },
    vocabularyLoaded: (state, action) => {
      state.words = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVocabularyStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVocabularyStats.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchVocabularyStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVocabulary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVocabulary.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchVocabulary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { vocabularyStatsLoaded, vocabularyLoaded } = vocabularySlice.actions;
export default vocabularySlice.reducer;
