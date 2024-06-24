import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, training, info } from "../../../public/urls";
import { headers } from "../../../public/urls";

export const fetchTraining = createAsyncThunk("training/fetchTraining", async (type, { dispatch }) => {
    const url = new URL(host + training);

    const params = new URLSearchParams({
        type,
    });
    url.search = params.toString();

    try {
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                ...headers,
            },
        });
        const data = await response.json();

        if (data.length != 0) {
            dispatch(trainingLoaded(data));
        } else {
            console.log(data);
        }

        return data;
    } catch (error) {
        if (error.message === "Unauthorized") {
            console.log("Ошибка 401: Unauthorized");
        }
        console.log(error);
    }
});
export const fetchTrainingInfo = createAsyncThunk("training/fetchTrainingInfo", async (_, { dispatch }) => {
    const url = new URL(host + info);

    try {
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                ...headers,
            },
        });
        const data = await response.json();
        dispatch(trainingInfoLoaded(data));
        return data;
    } catch (error) {
        if (error.message === "Unauthorized") {
            console.log("Ошибка 401: Unauthorized");
        }
        console.log(error);
    }
});

export const fetchTrainingPatch = createAsyncThunk("training/fetchTrainingPatch", async ({ type, pk, is_correct }, { dispatch }) => {
    const url = new URL(host + training);

    const params = new URLSearchParams({
        type,
    });
    url.search = params.toString();

    const body = {
        pk: pk,
        is_correct: is_correct,
    };
    console.log(JSON.stringify(body));
    const response = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
            ...headers,
        },
        body: JSON.stringify(body),
    });
    if (response.ok) {
        return;
    } else {
        throw new Error(response.statusText);
    }
});

const trainingSlice = createSlice({
    name: "training",
    initialState: {
        // training
        training: null,
        round: 0,

        // info
        trainingInfo: null,

        loading: false,
        error: null,
    },
    reducers: {
        trainingLoaded: (state, action) => {
            state.training = action.payload;
        },
        trainingInfoLoaded: (state, action) => {
            state.trainingInfo = action.payload;
        },
        nextRound: (state, action) => {
            state.round = state.round + 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTraining.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTraining.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchTraining.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchTrainingPatch.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrainingPatch.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchTrainingPatch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(trainingInfoLoaded.pending, (state) => {
                state.loading = true;
            })
            .addCase(trainingInfoLoaded.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(trainingInfoLoaded.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { trainingLoaded, nextRound, trainingInfoLoaded } = trainingSlice.actions;
export default trainingSlice.reducer;
