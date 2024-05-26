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
import TESTV1 from "./pages/tests/playback_test/TestV1";
import TESTV2 from "./pages/tests/recognition_test/TestV2";

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
            <Route path="/book" element={<BookRetrieve />} />
            <Route path="/bookmarks" element={<BookmarkList />} />
            <Route path="/login" element={<Login />} />

            <Route path="/test/v1" element={<TESTV1 />} />
            <Route path="/test/v2" element={<TESTV2 />} />
            {/* Другие маршруты */}
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
