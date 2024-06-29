import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, login, refresh, verify } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async ({ username, password }, { dispatch }) => {
    console.log("fetchlogin");
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
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("access", data.access);
        dispatch(setIsAuth(true));
        return data;
    } else {
        throw new Error(response.statusText);
    }
});

export const fetchRefresh = createAsyncThunk("auth/fetchRefresh", async (refreshToken, { dispatch }) => {
    const url = new URL(host + refresh);

    const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
            ...headers,
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
        const data = await response.json();

        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("access", data.access);

        dispatch(setIsAuth(true));
        return data;
    } else {
        throw new Error(response.statusText);
    }
});

const fetchVerify = async (token) => {
    const url = new URL(host + verify);
    const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
            ...headers,
        },
        body: JSON.stringify({ token }),
    });

    if (response.status === 200) {
        return true;
    } else if (response.status === 401) {
        return false; // Обработка статуса 401
    } else {
        throw new Error("Ошибка при запросе: " + response.status);
    }
};

export const checkAccessTokenValidity = () => async (dispatch) => {
    const access = localStorage.getItem("access");
    if (!access || access == null || access == undefined) {
        // Не авторизован
        dispatch(setIsAuth(false));
        return;
    }
    let isVerifyAccess = await fetchVerify(access);
    try {
        if (!isVerifyAccess) {
            const refresh = localStorage.getItem("refresh");

            if (refresh) {
                let isVerifyRefresh = await fetchVerify(refresh);
                // access истек
                if (!isVerifyRefresh) {
                    // refresh and access token expired
                    dispatch(setIsAuth(false));
                } else {
                    // access истек
                    dispatch(fetchRefresh(refresh));
                }
            } else {
                // Не авторизован, нет refresh token
                dispatch(setIsAuth(false));
            }
        } else {
            // Авторизован
            dispatch(setIsAuth(true));
        }
    } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: null,
        loading: false,
        error: null,
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
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

export const { setError, setIsAuth } = authSlice.actions;
export default authSlice.reducer;
