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

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const log = {
    'bookmarks': bookmarks, 
    'loading': loading, 
    'error': error,
    'currentPage': currentPage  
  }
  console.log(log)

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
      <Search />
      <main className="container px-4">
      {(bookmarks &&
          bookmarks.results &&
          bookmarks.results.map((bookmark, index) => (
            <Link key={`${bookmark.pk}-${index}`} to={`/book/${bookmark.book_cover.slug}`}>
              <BookmarkCard bookmark={bookmark} />
            </Link>
          ))) ||
          (loading ? <Skeleton /> : <p>Error: {error}</p>)}
      </main>
    </div>
  )

}

export default BookmarkList;
