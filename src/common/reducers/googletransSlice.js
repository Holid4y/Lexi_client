import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, googletrans } from "../../../public/urls";
import { headers } from "../../../public/urls";


export const fetchGooletrans = createAsyncThunk("word/fetchWordPost", async (text, { dispatch }) => {
    const url = new URL(host + googletrans);
    console.log(text, 'googletrans')
    try {
        const response = await fetch(url.toString(), {
            method: "POST",
            headers: {
                ...headers,
            },
            body: JSON.stringify({
                text: text,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data)
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
            .addCase(fetchGooletrans.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGooletrans.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchGooletrans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { googletransLoaded } = gooletransSlice.actions;
export default gooletransSlice.reducer;
