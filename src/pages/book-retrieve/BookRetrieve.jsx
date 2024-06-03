import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchBook } from "../../common/reducers/bookRetrieveSlice";
import { fetchBookmarksCreateUpdate } from "../../common/reducers/bookmarkSlice";

import Navigation from "../../common/components/navigation/Navigation";
import BookRetrieveHeader from "./components/BookRetrieveHeader";

function BookRetrieve() {
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.book);
  const currentPage = useSelector((state) => state.page);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(fetchBook(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (book && book.book) {
      setCurrentPageIndex(1);
    }
  }, [book]);

  const handlePageChange = (newPageIndex) => {
    setCurrentPageIndex(newPageIndex);
  };

  const log = {
    book: book,
    loading: loading,
    error: error,
    currentPage: currentPage,
  };
  console.log(log);

  // ---Создание закладки---

  // Когда зарегестрированный пользователь нажимает
  // на иконку закладки, надо вызвать:

  const createBookmark = () => {
    if (book && book.pk) {
      const bookId = book.pk;
      const targetPage = currentPage;
      dispatch(fetchBookmarksCreateUpdate({ bookId, targetPage }));
    } else {
      console.error(
        "Ошибка: Невозможно создать закладку. Книга не загружена или отсутствует book.pk"
      );
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
      console.error(
        "Ошибка: Невозможно удалить закладку. Отсутствует bookmarkId"
      );
    }
  };

  const renderPagination = () => {
    const totalPages = book.page_count;
    const pagesToShow = 3;
    const startPage = Math.max(1, currentPageIndex - 1);
    const endPage = Math.min(totalPages, currentPageIndex + 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPageIndex ? "active" : ""}`}
        >
          <a
            className="page-link text-white"
            href="#"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }

    return (
      <ul className="pagination">
        <li className={`page-item ${currentPageIndex === 1 ? "disabled" : ""}`}>
          <a
            className="page-link text-white"
            href="#"
            aria-label="Previous"
            onClick={() => handlePageChange(currentPageIndex - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pages}
        <li
          className={`page-item ${
            currentPageIndex === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link text-white"
            href="#"
            aria-label="Next"
            onClick={() => handlePageChange(currentPageIndex + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    );
  };

  // Одна страница из массива книги
  const getPage = (book) => {
    if (book) {
      const page = book.book[currentPageIndex - 1];
      return page;
    }
    return [];
  };

  // Создание JSX элементов <p> для каждой строки
  const paragraphs = getPage(book).map((line, index) => (
    <p key={index}>{line}</p>
  ));

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {book && (
        <div>
          <BookRetrieveHeader/>
          <main className="container px-4">
            <div className="book-text-read">{paragraphs}</div>
            <div className="justify-content-center d-flex">
              {renderPagination()}
            </div>
          </main>
          <Navigation />
        </div>
      )}
    </div>
  );
}

export default BookRetrieve;
