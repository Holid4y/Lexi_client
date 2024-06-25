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
        console.log('fetchTraining')
        if (data.length != 0) {
            dispatch(trainingLoaded(data));
            dispatch(setType(type))
        } else

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


        round_recognize: 0,
        round_reproduce: 0,

        type: null,
        score: 0,

        
        // info
        count_word_to_training_recognize: null,
        count_word_to_training_reproduce: null,

        patchLoading: false,
        patchError: null,

        loading: false,
        error: null,
        

    },
    reducers: {
        trainingLoaded: (state, action) => {
            state.training = action.payload;
        },
        trainingInfoLoaded: (state, action) => {
            state.count_word_to_training_recognize = action.payload.count_word_to_training_recognize;

            state.count_word_to_training_reproduce = action.payload.count_word_to_training_reproduce;
        },
        nextRound: (state, action) => {
            if (state.type === "recognize"){
                state.round_recognize = state.round_recognize + 1
            }
            if (state.type === "reproduce"){
                state.round_reproduce =  state.round_reproduce + 1
            }  
        },
        addScore: (state, action) => {
            state.score = state.score + 1;
        },
        decrementTrainingInfoRecognize: (state, action) => {
            state.count_word_to_training_recognize = state.count_word_to_training_recognize - 1;
        },
        decrementTrainingInfoReproduce: (state, action) => {
            state.count_word_to_training_reproduce = state.count_word_to_training_reproduce - 1;
        },

        clearTraining: (state, action) => {
            state.training = null
        },
        clearRound: (state, action) => {
            if (state.type === "recognize"){
                state.round_recognize = 0
            }
            if (state.type === "reproduce"){
                state.round_reproduce = 0
            }    
            
        },
        clearScore: (state, action) => {
            state.score = 0
        },
        setType: (state, action) => {
            state.type = action.payload;
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
                state.patchLoading = true;
            })
            .addCase(fetchTrainingPatch.fulfilled, (state) => {
                state.patchLoading = false;
            })
            .addCase(fetchTrainingPatch.rejected, (state, action) => {
                state.patchLoading = false;
                state.patchError = action.error.message;
            })

            .addCase(fetchTrainingInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrainingInfo.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchTrainingInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { trainingLoaded, nextRound, addScore, trainingInfoLoaded, clearTraining, decrementTrainingInfoReproduce, decrementTrainingInfoRecognize, clearScore, setType, clearRound } = trainingSlice.actions;
export default trainingSlice.reducer;
