import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "./common/reducers/authSlice";

import Navigation from "./common/components/navigation/Navigation";

// Главная страница
import Home from "./pages/home/Home";

// Авторизация
import Login from "./pages/auth/login/Login"; // Вход

// Книги
import BookList from "./pages/books/BookList";
import BookRetrieve from "./pages/book-retrieve/BookRetrieve";
import BookmarkList from "./pages/bookmark-list/BookmarkList";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);

  let access = localStorage.getItem('access')

  if (access) {
    dispatch(setIsAuth(true))
  }

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
            <Route path="/book/:id" element={<BookRetrieve />} />
            <Route path="/bookmarks" element={<BookmarkList />} />
            <Route path="/login" element={<Login />} />
            {/* Другие маршруты */}
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
