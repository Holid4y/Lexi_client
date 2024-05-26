import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchBookmarksDelete } from "../../common/reducers/bookmarkSlice";


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

}

export default BookmarkList;
