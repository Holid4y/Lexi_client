import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, login, refresh, verify } from "../../../public/urls";
import { headers } from "../../../public/urls";


export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async ({ username, password }, { dispatch }) => {
    const url = new URL(host + login);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        ...headers,
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access', data.access);
      return data;
    } else {
      throw new Error(response.statusText);
    }
  }
);


export const fetchRefresh = createAsyncThunk(
  "auth/fetchRefresh",
  async (_, { dispatch }) => {
    const url = new URL(host + refresh);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        ...headers,
      },
    });
    const data = await response.json();
    //   dispatch(bookmarkLoaded(data));
    console.log(data);
    return data;
  }
);

export const fetchVerify = createAsyncThunk(
  "auth/fetchVerify",
  async (_, { dispatch }) => {
    const url = new URL(host + verify);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        ...headers,
      },
    });
    const data = await response.json();
    //   dispatch(bookmarkLoaded(data));
    console.log(data);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setError } = authSlice.actions;
export default authSlice.reducer;
