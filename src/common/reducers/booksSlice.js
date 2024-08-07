import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, books, myBooks } from "../../../public/urls";
import { getResponse } from "../../../public/urls";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async (page, { dispatch }) => {
    const url = new URL(host + books);

    const params = new URLSearchParams({
        page,
    });
    url.search = params.toString();
    
    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(booksLoaded(data));
        }
    }
    return data;
});

export const fetchMyBooks = createAsyncThunk("books/fetchMyBooks", async (page, { dispatch }) => {
    const url = new URL(host + myBooks);
    
    const response = await getResponse(url, "GET")
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(booksLoaded(data));
        }
    }
    return data;
});

const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: null,
        loading: false,
        error: null,
    },
    reducers: {
        booksLoaded: (state, action) => {
            state.books = action.payload;
        },
        unshiftBooksList: (state, action) => {
            if (action.payload) {
                state.books.results.unshift(action.payload);
            }
            
        },
        deleteBookByIndex: (state, action) => {
            // Получаем индекс из action.payload
            const indexToDelete = action.payload;
        
            // Проверяем, что индекс валиден
            if (indexToDelete >= 0 && indexToDelete < state.books.results.length) {
                // Создаем новый массив, исключая элемент по указанному индексу
                state.books.results = state.books.results.filter((_, index) => index !== indexToDelete);
            }
        },
        
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchMyBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyBooks.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchMyBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { booksLoaded, unshiftBooksList, deleteBookByIndex } = booksSlice.actions;
export default booksSlice.reducer;
