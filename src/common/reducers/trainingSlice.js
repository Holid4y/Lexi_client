import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, training} from "../../../public/urls";
import { headers } from "../../../public/urls";


export const fetchTraining = createAsyncThunk(
    "training/fetchTraining",
    async (type, { dispatch }) => {
      const url = new URL(host + training);
      try {
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            ...headers,
          },
        });
        const data = await response.json();
        console.log(data)
        // dispatch(trainingLoaded(data));
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
    

    loading: false,
    error: null,

},
reducers: {
    trainingLoaded: (state, action) => {
    //
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

export const { trainingLoaded } = trainingSlice.actions;
export default trainingSlice.reducer;