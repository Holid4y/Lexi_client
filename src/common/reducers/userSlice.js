import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, user, settings } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { dispatch }) => {
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
});
export const fetchSettings = createAsyncThunk("user/fetchSettings", async (_, { dispatch }) => {
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
});

export const fetchPutSettings = createAsyncThunk("user/fetchPutSettings", async (data, { dispatch }) => {
    const url = new URL(host + settings);

    try {
        const response = await fetch(url.toString(), {
            method: "PUT",
            headers: {
                ...headers,
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        dispatch(settingsPutLoaded(result));
        // Проверяем статус ответа
        if (!response.ok) {
            // Если статус не 2xx, бросаем ошибку
            dispatch(setError(result))
            throw new Error(`Ошибка ${response.status}: ${response.statusText}.`);
        }
        return result;
    } catch (error) {
        if (error.message === "Unauthorized") {
            console.log("Ошибка 401: Unauthorized");
        }
        console.log(error)
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        // user
        username: null,
        email: null,
        activated_email: false,
        // settings
        dark_theme: false,
        number_of_false_set: null,
        levels: null,
        count_word_in_round: null,
        time_to_view_result: null,
        // settings get
        loading: false,
        error: null,
        // settings put
        putLoading: false,
        putError: null,
    },
    reducers: {
        settingsLoaded: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.activated_email = action.payload.activated_email;
            state.dark_theme = action.payload.settings.dark_theme;
            state.number_of_false_set = action.payload.settings.number_of_false_set;
            state.levels = action.payload.settings.levels;
            state.count_word_in_round = action.payload.settings.count_word_in_round;
            state.time_to_view_result = action.payload.settings.time_to_view_result;
        },
        settingsPutLoaded: (state, action) => {
            state.dark_theme = action.payload.dark_theme;
            state.number_of_false_set = action.payload.number_of_false_set;
            state.levels = action.payload.levels;
            state.count_word_in_round = action.payload.count_word_in_round;
            state.time_to_view_result = action.payload.time_to_view_result;
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
        // error
        setError: (state, action) => {
            state.error = action.payload
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

            .addCase(fetchPutSettings.pending, (state) => {
                state.putLoading = true;
            })
            .addCase(fetchPutSettings.fulfilled, (state) => {
                state.putLoading = false;
            })
            .addCase(fetchPutSettings.rejected, (state, action) => {
                state.putLoading = false;
                state.putError = action.error.message;
            });
    },
});

export const { settingsLoaded, settingsPutLoaded, updateLevels, addLevel, deleteLevel, setError } = userSlice.actions;
export default userSlice.reducer;
