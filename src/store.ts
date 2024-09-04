import { combineReducers } from 'redux';
import booksReducer from './common/reducers/booksSlice';
import bookRetrieveReducer from './common/reducers/bookRetrieveSlice';
import paginationReducer from './common/reducers/paginationSlice';
import bookmarkReducer from './common/reducers/bookmarkSlice';
import authReducer from './common/reducers/authSlice';
import userReducer from './common/reducers/userSlice';
import homeReducer from './common/reducers/homeSlice';
import vocabularyReducer from './common/reducers/vocabularySlice';
import wordReducer from './common/reducers/wordSlice';
import trainingReducer from './common/reducers/training/trainingSlice';
import trainingRoundReducer from './common/reducers/training/trainingRoundSlice';
import googletransReducer from './common/reducers/googletransSlice';
import addBookModalReducer from './common/reducers/addBookModalSlice';
import statsReducer from './common/reducers/statsSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    books: booksReducer,
    book: bookRetrieveReducer,
    page: paginationReducer,
    bookmarks: bookmarkReducer,
    auth: authReducer,
    user: userReducer,
    home: homeReducer,
    vocabulary: vocabularyReducer,
    word: wordReducer,
    training: trainingReducer,
    trainingRound: trainingRoundReducer,
    googletrans: googletransReducer,
    addBookModal: addBookModalReducer,
    stats: statsReducer,
});

// Определяем интерфейс RootState
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch; // Определите тип для dispatch
