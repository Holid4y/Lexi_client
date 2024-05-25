import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './common/reducers/booksSlice';
import bookRetrieveReducer from './common/reducers/bookRetrieveSlice';
import paginationReducer from './common/reducers/paginationSlice';
import bookmarkListReducer from './common/reducers/bookmarkListSlice';
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