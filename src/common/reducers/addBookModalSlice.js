import { createSlice } from "@reduxjs/toolkit";

const addBookModal = createSlice({
    name: "addBookModal",
    initialState: {
        type: null,
        textArea: null,
        file: null,
        authorName: null,
        title: null,
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
        }
    }
});

export const { 
    setType,
    setTextArea,
    setFile,
    setAuthorName,
    setTitle,
    setIsPrivet
} = addBookModal.actions;
export default addBookModal.reducer;
