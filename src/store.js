import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './pages/books/booksSlice';
import bookRetrieveReducer from './pages/book-retrieve/bookRetrieveSlice';
import paginationReducer from './common/components/pagination/paginationSlice';
import bookmarkListReducer from './pages/bookmark-list/bookmarkListSlice'
import authSlice from './common/reducers/authSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookRetrieveReducer,
    page: paginationReducer,
    bookmarks: bookmarkListReducer,
    auth: authSlice,
  },
});

export default store;