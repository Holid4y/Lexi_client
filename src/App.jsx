import Navigation from "./common/components/navigation/Navigation";

import BookList from "./pages/books/BookList";
import BookRetrieve from "./pages/book-retrieve/BookRetrieve";
import BookmarkList from "./pages/bookmark-list/BookmarkList";
import Login from "./pages/login/Login";

function App() {

  return (
    <>
      <div>
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
