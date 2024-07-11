import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, login, registration, refresh, verify } from "../../../public/urls";
import { headers, getResponse } from "../../../public/urls";

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async ({ username, password }, { dispatch }) => {

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

export const fetchRegistration = createAsyncThunk("auth/fetchRegistration", async ({ username, email, password, re_password }, { dispatch }) => {

    const url = new URL(host + registration);

    const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
            ...headers,
        },
        body: JSON.stringify({
            username,
            email,
            password,
            re_password
        }),
    });

    console.log("Ответ сервера:", response);
    
    if (response.ok) {
        const data = await response.json();    
        console.log("Полученные данные:", data);
        return data;
    } else if (response.status == 400) {
        const data = await response.json();
        dispatch(setError(data))
    } 
    
    else {
        console.error("Ошибка при регистрации:", response.status, response.statusText);
        throw new Error(`Ошибка при регистрации: ${response.status} - ${response.statusText}`);
    }
});


export const fetchRefresh = createAsyncThunk("auth/fetchRefresh", async (refreshToken, { dispatch }) => {
    const url = new URL(host + refresh);
    console.log('fetchRefresh')
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
function checkResponseStatus(response) {
    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      // Обработка статуса 401
      console.log('Ошибка авторизации (401)');
      return false;
    } else {
      // Обработка других статусов ошибок
      console.log(`Ошибка ${response.status}: ${response.statusText}`);
      return false;
    }
  }
const fetchVerify = async (token) => {
    const url = new URL(host + verify);
    const response = await getResponse(url, "POST", JSON.stringify({ token }));
    return checkResponseStatus(response)
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
            })
            
            .addCase(fetchRegistration.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRegistration.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setError, setIsAuth } = authSlice.actions;
export default authSlice.reducer;
