// React
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "./common/reducers/authSlice";
import { setTheme } from './common/reducers/themeSlice';
// JWT
import { checkAccessTokenValidity } from './common/reducers/authSlice';


import Navigation from './common/components/Navigation';
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import BookList from "./pages/books/BookList";
import BookRetrieve from "./pages/book-retrieve/BookRetrieve";
import BookmarkList from "./pages/bookmark-list/BookmarkList";
import Recognize from './pages/training/recognize/Recognize';
import Reproduce from './pages/training/reproduce/Reproduce';
import WordList from './pages/word-list-user/WordList';
import Profile from "./pages/profile/ProfileUser";
import LvlSettings from "./pages/profile/lvlSettings";
import Statistic from './pages/statistic-user/Statistic';


function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const { darkTheme } = useSelector(state => state.theme);
  
  useEffect(() => {
    // Проверяем токен при загрузке приложения
    dispatch(checkAccessTokenValidity());

    // Загружаем тему из localStorage при загрузке приложения
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      dispatch(setTheme(storedTheme === 'dark'));
    } else {
      dispatch(setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches));
    }
  }, [dispatch]);

  useEffect(() => {
    // Применяем тему при изменении значения darkTheme
    const theme = darkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkTheme]);


  return (
    <Router>
      <>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/book/:slug/:page" element={<BookRetrieve />} />
            <Route path="/bookmarks" element={<BookmarkList />} />
            <Route path="/login" element={<Login />} />

            <Route path="/training/recognize" element={<Recognize />} />
            <Route path="/training/reproduce" element={<Reproduce />} />
            <Route path="/word-list" element={<WordList />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/statistic" element={<Statistic />} />
            <Route path="/lvl-settings" element={<LvlSettings />} />
            {/* Другие маршруты */}
          </Routes>
        </div>
      </>
      <Navigation />
    </Router>
  );
}

export default App;
