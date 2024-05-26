import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBook } from "../../common/reducers/bookRetrieveSlice";
import { fetchBookmarksCreateUpdate } from "../../common/reducers/bookmarkListSlice";



function BookRetrieve() {
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector(state => state.book);
  const currentPage = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(fetchBook('mr-hicks-alexie-aaron'));
  }, [dispatch]);

  const log = {
    'book': book, 
    'loading': loading, 
    'error': error,
    'currentPage': currentPage 
  }
  console.log(log)

  // ---Создание закладки---

  // Когда зарегестрированный пользователь нажимает 
  // на иконку закладки, надо вызвать:

  const createBookmark = () => {
    if (book && book.pk) {
      const bookId = book.pk;
      const targetPage = currentPage;
      dispatch(fetchBookmarksCreateUpdate({ bookId, targetPage }));
    } else {
      console.error('Ошибка: Невозможно создать закладку. Книга не загружена или отсутствует book.pk');
    }
  };

}

export default BookRetrieve;
