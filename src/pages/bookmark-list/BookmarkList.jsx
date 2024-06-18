import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchBookmarksDelete } from "../../common/reducers/bookmarkSlice";
import { Link } from "react-router-dom";

import Search from "../../common/components/Search";
import Skeleton from "./components/Skeleton";
import BookmarkCard from "./components/BookmarkCard";
import AddBook from "./components/AddBook";

function BookmarkList() {
  const dispatch = useDispatch();
  const { bookmarks, loading, error } = useSelector(state => state.bookmarks);
  const currentPage = useSelector((state) => state.page);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  // Обработчик изменения значения поиска
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  // Удаление закладки
  const deleteBookmark = (bookmarkId) => {
    if (bookmarkId) {
      dispatch(fetchBookmarksDelete(bookmarkId));
    } else {
      console.error('Ошибка: Невозможно удалить закладку. Отсутствует bookmarkId');
    }
  };

  const filteredBookmarks = bookmarks?.results?.filter((bookmark) =>
    bookmark.book_cover.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="align-items-center">
      <Search onChange={handleSearchChange} />
      <main className="container px-4">
        <div className="row g-4">
          {loading ? (
            <Skeleton />
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              {filteredBookmarks && filteredBookmarks.length > 0 ? (
                filteredBookmarks.map((bookmark, index) => (
                  <BookmarkCard bookmark={bookmark} key={index} />
                ))
              ) : (
                <div className="text-center mt-5">
                  <h4>У вас пока что нет книг в избранном 😔</h4>
                </div>
              )}
            </>
          )}
        </div>
        <AddBook />
      </main>
    </div>
  );
}

export default BookmarkList;
