import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, googletrans } from "../../../public/urls";
import { getResponse } from "../../../public/urls";


export const fetchGoogletrans = createAsyncThunk("gooletrans/fetchGoogletrans", async (text, { dispatch }) => {
    const url = new URL(host + googletrans);

    const body = { 
        text: text,
    }
    const bodyString = JSON.stringify(body);

    const response = await getResponse(url, "POST", bodyString)

    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            return data
            // dispatch(googletransLoaded(data));
        }
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
