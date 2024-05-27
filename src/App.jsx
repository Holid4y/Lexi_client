// React
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "./common/reducers/authSlice";

// JWT
import { checkAccessTokenValidity } from './common/reducers/authSlice';

import Navigation from "./common/components/navigation/Navigation";

// Главная страница
import Home from "./pages/home/Home";

// Авторизация
import Login from "./pages/auth/login/Login"; // Вход

// Книги
import BookList from "./pages/books/BookList";
import BookRetrieve from "./pages/book-retrieve/BookRetrieve";
import BookmarkList from "./pages/bookmark-list/BookmarkList";

// Тесты
import Recognize from './pages/training/recognize/Recognize';
import Reproduce from './pages/training/reproduce/Reproduce';

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);


  
  useEffect(() => {
    // Вызов функции проверки срока действия access токена при загрузке приложения
    dispatch(checkAccessTokenValidity())
  }, []);

  const log = {
    'isAuth': isAuth
  }
  console.log(log)

  return (
    <Router>
      <>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/book/:slug" element={<BookRetrieve />} />
            <Route path="/bookmarks" element={<BookmarkList />} />
            <Route path="/login" element={<Login />} />

            <Route path="/training/recognize" element={<Recognize />} />
            <Route path="/training/reproduce" element={<Reproduce />} />
            {/* Другие маршруты */}
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
