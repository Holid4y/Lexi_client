import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Главная страница
import Home from "./pages/home/Home";

// Авторизация
import Login from "./pages/auth/login/Login"; // Вход

// Книги
import BookList from "./pages/books/BookList";
import BookRetrieve from "./pages/book-retrieve/BookRetrieve";
import BookmarkList from "./pages/bookmark-list/BookmarkList";

function App() {
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
