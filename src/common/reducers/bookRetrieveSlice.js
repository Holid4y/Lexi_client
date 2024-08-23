import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, books, myBooks } from "../../../public/urls";
import { getResponse } from "../../../public/urls";

function getPageFromUrl(url) {   
    const parts = url.split("/").filter(part => part !== "");
    const lastPart = parts.pop(); 
    const pageNumber = parseInt(lastPart, 10);
    return !isNaN(pageNumber) ? pageNumber : 1; 
}

export const fetchBook = createAsyncThunk("book/fetchBook", async (params, { dispatch }) => {
    const { slug, page } = params;
    const url = new URL(host + books + slug + "/" + page + "/");

    const response = await getResponse(url, "GET");
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(bookLoaded(data));
            if (response.redirected) {
                const redirectedPage = getPageFromUrl(response.url);
                return { ...data, redirected: true, redirectedPage: redirectedPage };
            } else {
                return data;
            }
        }
    } else if (response.status === 404){
        dispatch(setError(404))
    }
});

export const fetchBookPost = createAsyncThunk("book/fetchBookPost", async (body, { dispatch }) => {
    const url = new URL(host + books);
    const bodyString = JSON.stringify(body);

    const response = await getResponse(url, "POST", bodyString) 
    const dataJson = await response.json();

    

    if (response.ok) {
        const data = {
            "book": dataJson,
            "status": 201
        }
        return data
    } else {
        const data = {
            "book": null,
            "status": 401
        }
        dispatch(setError(dataJson))
    }
});


export const fetchBookDelete = createAsyncThunk("book/fetchBookDelete", async (slug, { dispatch }) => {
    const url = new URL(host + myBooks + slug + '/');

    const response = await getResponse(url, "DELETE")

    return
});

const bookRetrieveSlice = createSlice({
    name: "book",
    initialState: {
        pk: null,
        title: null,
        author: null,
        author_upload: null,
        page_count: null,
        pages_slice: null,
        slice_length: null,
        slug: null,
        pages: null,
        bookmark: null,

        loading: false,
        error: null,
    },
    reducers: {
        bookLoaded: (state, action) => {
            state.pk = action.payload.pk;
            state.title = action.payload.title;
            state.author = action.payload.author;
            state.author_upload = action.payload.author_upload;
            state.page_count = action.payload.page_count;
            state.pages_slice = action.payload.pages_slice;
            state.slice_length = action.payload.slice_length;
            state.slug = action.payload.slug;
            state.pages = action.payload.pages;
            state.bookmark = action.payload.bookmark;
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBook.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { bookLoaded, setError } = bookRetrieveSlice.actions;
export default bookRetrieveSlice.reducer;
