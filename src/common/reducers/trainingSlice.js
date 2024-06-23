import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, training} from "../../../public/urls";
import { headers } from "../../../public/urls";


export const fetchTraining = createAsyncThunk(
    "training/fetchTraining",
    async (type, { dispatch }) => {
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
        dispatch(trainingLoaded(data));
        return data;
      } catch (error) {
        if (error.message === "Unauthorized") {
          console.log("Ошибка 401: Unauthorized");
        }
        console.log(error)
      }
    }
  );
  
  export const fetchTrainingPatch = createAsyncThunk(
    "training/fetchTrainingPatch",
    async (data, { dispatch }) => {
      const url = new URL(host + settings);
  
      try {
        const response = await fetch(url.toString(), {
          method: "PATCH",
          headers: {
            ...headers,
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result)
        // dispatch(trainingLoaded(result));
        return result;
      } catch (error) {
        if (error.message === "Unauthorized") {
          console.log("Ошибка 401: Unauthorized");
        }
        console.log(error)
      }
    }
  );

const trainingSlice = createSlice({
name: "training",
initialState: {
    // training
    training: null,
    round: 0,

    loading: false,
    error: null,

},
reducers: {
    trainingLoaded: (state, action) => {
        state.training = action.payload
    },
    nextRound: (state, action) => {
        state.round = state.round + 1
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

},
});

export const { trainingLoaded, nextRound } = trainingSlice.actions;
export default trainingSlice.reducer;