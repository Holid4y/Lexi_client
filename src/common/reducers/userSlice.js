import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, user, settings, dictionaryLevels } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { dispatch }) => {
    const url = new URL(host + user);

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
export const fetchSettings = createAsyncThunk(
  "user/fetchSettings",
  async (_, { dispatch }) => {
    const url = new URL(host + settings);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const data = await response.json();
      dispatch(settingsLoaded(data));
      return data;
    } catch (error) {
      if (error.message === "Unauthorized") {
        console.log("Ошибка 401: Unauthorized");
      }
    }
  }
);

export const fetchPatchSettings = createAsyncThunk(
  "user/fetchPatchSettings",
  async (_, { dispatch }) => {
    const url = new URL(host + settings);

    try {
      const response = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          ...headers,
        },
      });
      const data = await response.json();
      // dispatch(settingsLoaded(data));
      return data;
    } catch (error) {
      if (error.message === "Unauthorized") {
        console.log("Ошибка 401: Unauthorized");
      }
    }
  }
);

export const fetchDictionaryLevels = createAsyncThunk(
  "user/fetchDictionaryLevels",
  async (_, { dispatch }) => {
    const url = new URL(host + dictionaryLevels);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const data = await response.json();
      dispatch(dictionaryLevelsLoaded(data));
      return data;
    } catch (error) {
      if (error.message === "Unauthorized") {
        console.log("Ошибка 401: Unauthorized");
      }
    }
  }
);

export const fetchPutDictionaryLevels = createAsyncThunk(
  "user/fetchPutDictionaryLevels",
  async (data, { dispatch }) => {
    const url = new URL(host + dictionaryLevels);

    try {
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          ...headers,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      dispatch(dictionaryLevelsLoaded(result));
      return result;
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
    // user
    user: null,
    // settings
    username: null,
    email: null,
    activated_email: false,
    dark_theme: false,
    number_of_false_set: 4,
    // dictionaryLevels
    levels: null,
    // other
    loading: false,
    error: null,
  },
  reducers: {
    settingsLoaded: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.activated_email = action.payload.activated_email;
      state.dark_theme = action.payload.dark_theme;
      state.number_of_false_set = action.payload.number_of_false_set;
    },
    dictionaryLevelsLoaded: (state, action) => {
      state.levels = action.payload.levels;
    },
    updateLevels: (state, action) => {
      state.levels = action.payload.levels;
    },
    addLevel: (state, action) => {
      state.levels.push(action.payload.level);
    },
    deleteLevel: (state, action) => {
      state.levels.splice(action.payload.level, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchDictionaryLevels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDictionaryLevels.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchDictionaryLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPutDictionaryLevels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPutDictionaryLevels.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchPutDictionaryLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { settingsLoaded, dictionaryLevelsLoaded, updateLevels, addLevel, deleteLevel } =
  userSlice.actions;
export default userSlice.reducer;
