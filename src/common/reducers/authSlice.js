import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, login, refresh, verify } from "../../../public/urls";
import { headers } from "../../../public/urls";
import { generateExtraReducers, generateExtraReducersFromActions } from "./extraReducer";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async ({ username, password }, { dispatch }) => {
    const url = new URL(host + login);
    console.log(headers);
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
    const data = await response.json();
    console.log(response.status);

    if (response.ok) {
      console.log(data);
      return data;
    }
    if (response.status === 401) {
      dispatch(setError(data));
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


const authExtraReducers = generateExtraReducers(
    [fetchLogin.pending],
    [fetchLogin.fulfilled],
    [fetchLogin.rejected],
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
  extraReducers: generateExtraReducersFromActions(fetchLogin),
});

export const { setError } = authSlice.actions;
export default authSlice.reducer;
