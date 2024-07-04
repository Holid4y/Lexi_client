import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, googletrans } from "../../../public/urls";
import { headers } from "../../../public/urls";


export const fetchGoogletrans = createAsyncThunk("gooletrans/fetchGoogletrans", async (text, { dispatch }) => {
    const url = new URL(host + googletrans);
    const accessToken = localStorage.getItem("access");
    const auth = {
        Authorization: `Beare ${accessToken}`,
    };
    try {
        const response = await fetch(url.toString(), {
            method: "POST",
            headers: {
                ...headers,
                ...auth
            },
            body: JSON.stringify({
                text: text,
            }),
        });
        const data = await response.json();
        if (data) {
            dispatch(googletransLoaded(data));
        }
        
        return data;
    } catch (error) {
        if (error.message === "Unauthorized") {
            console.log("Ошибка 401: Unauthorized");
        }
        console.log(error);
    }
});

const gooletransSlice = createSlice({
    name: "gooletrans",
    initialState: {
        translated_text: null,

        loading: false,
        error: null,
    },
    reducers: {
        googletransLoaded: (state, action) => {
            state.translated_text = action.payload.translated_text
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoogletrans.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGoogletrans.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchGoogletrans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { googletransLoaded } = gooletransSlice.actions;
export default gooletransSlice.reducer;
