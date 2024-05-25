import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './common/reducers/booksSlice';
import bookRetrieveReducer from './common/reducers/bookRetrieveSlice';
import paginationReducer from './common/reducers/paginationSlice';
import bookmarkListReducer from './common/reducers/bookmarkListSlice';
import authReducer from './common/reducers/authSlice';
import userReducer from './common/reducers/userSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookRetrieveReducer,
    page: paginationReducer,
    bookmarks: bookmarkListReducer,
    auth: authReducer,
    user: userReducer
  },
});

export default store;