import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchBookmarksDelete } from "../../common/reducers/bookmarkSlice";

import Search from "../../common/components/Search";
import Skeleton from "./components/Skeleton";
import BookmarkCard from "./components/BookmarkCard";

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

  // ---Удаление закладки---

  // Когда зарегестрированный пользователь нажимает 
  // на иконку закладки, тем самым делая toggle с активной иконки
  // на посивную (ligth), надо вызвать:

  const deleteBookmark = (bookmarkId) => {
    if (bookmarkId) {
      dispatch(fetchBookmarksDelete(bookmarkId));
    } else {
      console.error('Ошибка: Невозможно удалить закладку. Отсутствует bookmarkId');
    }
  };
  return (
    <div className="align-items-center">
      <Search onChange={handleSearchChange} />
      <main className="container px-4">
        <div className="row g-4">
          {(bookmarks && bookmarks.results && bookmarks.results
              .filter((bookmark) => bookmark.book_cover.title.toLowerCase().includes(searchValue.toLowerCase()) ) // Фильтруем закладки по названию книги
              .map((bookmark, index) => (              
                  <BookmarkCard bookmark={bookmark} key={index}/>         
              ))) ||
            (loading ? <Skeleton /> : <p>Error: {error}</p>)}
        </div>
      </main>
    </div>
  )

}

export default BookmarkList;
