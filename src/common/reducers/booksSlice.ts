import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { host, books, myBooks } from "../../../public/urls";
import { getResponse } from "../../../public/urls";

// Основная функция для получения книг
const fetchBooksData = async (urlPath: string, page: number, dispatch: any) => {
    const url = new URL(host + urlPath);

    const params = new URLSearchParams({
        page: page.toString() // Преобразуем число в строку
    });
    url.search = params.toString();
    
    const response = await getResponse(url, "GET");
    
    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(booksLoaded(data));
        }
        return data; // Возвращаем данные
    }
    
    return null; // Возвращаем null в случае ошибки
};

// Реализация основной функции fetchBooksData
// Создаем асинхронные действия с использованием вспомогательной функции

export const fetchBooks = createAsyncThunk("books/fetchBooks", async (page: number, { dispatch }) => {
    return await fetchBooksData(books, page, dispatch);
});

export const fetchMyBooks = createAsyncThunk("books/fetchMyBooks", async (page: number, { dispatch }) => {
    return await fetchBooksData(myBooks, page, dispatch);
});



export interface BookCover {
    pk: number; 
    title: string; // Название книги
    author: string; // Автор книги
    author_upload: number; // ID пользователя, загрузившего книгу
    page_count: number; // Количество страниц в книге
    slug: string; // Слаг для URL
}


interface BooksState {
    books: {
        page_count: number; // Общее количество страниц пагинации
        next: number | null; // Номер следующей страницы (или null, если нет)
        previous: number | null; // Номер предыдущей страницы (или null, если нет)
        results: BookCover[]; // Массив книг
    } | null; // Может быть null, если данные еще не загружены
    loading: boolean;
    error: string | null;
}


const initialState: BooksState = {
    books: null,
    loading: false,
    error: null,
};


const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        booksLoaded: (state, action: PayloadAction<{
            page_count: number;
            next: number | null;
            previous: number | null;
            results: BookCover[];
        }>) => {
            state.books = action.payload; // Теперь action.payload содержит все необходимые поля
        },
        unshiftBooksList: (state, action: PayloadAction<BookCover | null>) => {
            if (action.payload && state.books) {
                state.books.results.unshift(action.payload);
            }
        },
        deleteBookByIndex: (state, action: PayloadAction<number>) => {
            const indexToDelete = action.payload;

            if (state.books && indexToDelete >= 0 && indexToDelete < state.books.results.length) {
                state.books.results = state.books.results.filter((_, index) => index !== indexToDelete);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<{
                page_count: number;
                next: number | null;
                previous: number | null;
                results: BookCover[];
            }>) => {
                state.loading = false;
                state.books = action.payload; // Сохраняем загруженные книги
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(fetchMyBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyBooks.fulfilled, (state, action: PayloadAction<{
                page_count: number;
                next: number | null;
                previous: number | null;
                results: BookCover[];
            }>) => {
                state.loading = false;
                state.books = action.payload; // Сохраняем загруженные книги
            })
            .addCase(fetchMyBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    },
});

export const { booksLoaded, unshiftBooksList, deleteBookByIndex } = booksSlice.actions;
export default booksSlice.reducer;
