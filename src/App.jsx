import Navigation from "./common/components/navigation/Navigation";

import BookList from "./pages/books/BookList";
import BookRetrieve from "./pages/book-retrieve/BookRetrieve";
import BookmarkList from "./pages/bookmark-list/BookmarkList";

// Авторизация
import Login from "./pages/auth/login/Login"; // Вход
// import Register from "./pages/auth/register/Register"; // Регистрация
// import ChangePass from "./pages/auth/changepass/ChangePass"; // Смена пароля
// import ForgotPass from "./pages/auth/forgotpass/ForgotPass"; // Забыл пароля


// new 
function App() {

  return (
    <>
      <div>
        <span>hello</span>
        <form action="get">ff</form>

        {/* <BookList /> */}
        {/* <BookRetrieve /> */}
        {/* <BookmarkList /> */}

        <Login />
      </div>
      {/* <Navigation /> */}
    </>
  );
}

export default App;
