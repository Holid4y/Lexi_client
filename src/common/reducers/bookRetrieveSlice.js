import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { host, books, myBooks } from "../../../public/urls";
import { getResponse } from "../../../public/urls";

function getPageFromUrl(url) {
    // Разбиваем URL на части
    const parts = url.split("/");

    // Находим индекс последней части URL
    const lastPartIndex = parts.length - 1;

    // Получаем последнюю часть URL
    const lastPart = parts[lastPartIndex];

    // Проверяем, является ли последняя часть числом
    if (!isNaN(parseInt(lastPart))) {
        // Если да, возвращаем ее как номер страницы
        return parseInt(lastPart);
    } else {
        // Если нет, возвращаем null или значение по умолчанию
        return null;
    }
}

export const fetchBook = createAsyncThunk("book/fetchBook", async (params, { dispatch }) => {
    const { slug, page, isPageSwitch } = params;
    const url = new URL(host + books + slug + "/" + page);

    const response = await getResponse(url, "GET");
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(bookLoaded(data));
            const value = { slug: slug, page: page };
            localStorage.setItem("recentlyBook", JSON.stringify(value));

            if (!isPageSwitch & response.redirected) {
                const redirectedPage = getPageFromUrl(response.url);
                return { ...data, redirected: true, redirectedPage: redirectedPage };
            } else {
                return data;
            }
        }
    }
});

export const fetchBookPost = createAsyncThunk("book/fetchBookPost", async (body, { dispatch }) => {
    const url = new URL(host + books);

    const bodyString = JSON.stringify(body);
    const response = await getResponse(url, "POST", bodyString)

    if (response.ok) {
        const data = await response.json();
        if (data) {
            return data
        }
    } 
});

export const fetchBookDelete = createAsyncThunk("book/fetchBookDelete", async (pk, { dispatch }) => {
    const url = new URL(host + myBooks + pk + '/');

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

export const { bookLoaded } = bookRetrieveSlice.actions;
export default bookRetrieveSlice.reducer;
