import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBook } from "../../common/reducers/bookRetrieveSlice";
import { fetchBookmarksCreateUpdate } from "../../common/reducers/bookmarkSlice";



function BookRetrieve() {
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector(state => state.book);
  const currentPage = useSelector((state) => state.page);

  useEffect(() => {
    // ---Отображение книги---

    // Когда пользователь, находясь на странице BookList 
    // и нажимает на книгу, его должно направить на book/slug/

    // slug находиться на странице BookList в переменной books.results[0].slug

    // для загрузки книги, надо вызвать:
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

export default BookRetrieve;
