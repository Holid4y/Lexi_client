import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, home } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchHome = createAsyncThunk(
  "home/fetchHome",
  async (_, { dispatch }) => {
    const url = new URL(host + home);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        ...headers,
      },
    }); 

    const data = await response.json();
    dispatch(homeLoaded(data));
    return data;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    home: null,
    loading: false,
    error: null,
  },
  reducers: {
    homeLoaded: (state, action) => {
      state.home = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHome.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { homeLoaded } = homeSlice.actions;
export default homeSlice.reducer;
