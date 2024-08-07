import { createSlice } from "@reduxjs/toolkit";

const addBookModal = createSlice({
    name: "addBookModal",
    initialState: {
        type: null,
        textArea: "",
        file: null,
        authorName: "",
        title: "",
        isPrivet: false,
    },
    reducers: {
        setType: (state, action) => {
            state.type = action.payload;
        },
        setTextArea: (state, action) => {
            state.textArea = action.payload;
        },
        setFile: (state, action) => {
            state.file = action.payload;
        },
        setAuthorName: (state, action) => {
            state.authorName = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setIsPrivet: (state, action) => {
            state.isPrivet = action.payload;
        },

        throwState: (state, action) => {
            state.type = null
            state.authorName = ""
            state.title = ""
            state.isPrivet = false
        }
    }
});

export const { 
    setType,
    setTextArea,
    setFile,
    setAuthorName,
    setTitle,
    setIsPrivet,
    throwState
} = addBookModal.actions;
export default addBookModal.reducer;
