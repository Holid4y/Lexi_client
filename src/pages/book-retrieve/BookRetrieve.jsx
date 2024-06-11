import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  fetchBook,
  writePages,
  writePrevPages,
} from "../../common/reducers/bookRetrieveSlice";
import { fetchBookmarksCreateUpdate } from "../../common/reducers/bookmarkSlice";

import BookRetrieveHeader from "./components/BookRetrieveHeader";
import Pages from "./components/Pages";

function BookRetrieve() {
  const dispatch = useDispatch();
  const { pages, nextPages, prevPages, loading, error } = useSelector(
    (state) => state.book
  );
  const [isNext, setIsNext] = useState(true);

  const { slug, page } = useParams();

  useEffect(() => {
    if (isNext) {
      // если четная 10 страница,
      // то делает запрос на сервер
      if (page % 10 == 0) {
        console.log("fetch");
        dispatch(fetchBook({ slug: slug, page: page }));
      }

      // на одну страницу раньше, обновляет буферную страницу
      // на текущую
      if ((parseInt(page) - 1) % 10 == 0) {
        console.log("write");
        dispatch(writePages());
      }
    } else {
      // если четная 10 страница,
      // то делает запрос на сервер
      if (page % 10 == 1) {
        console.log("fetch prev");
        dispatch(fetchBook({ slug: slug, page: page - 2 }));
      }
      if (parseInt(page) % 10 == 0) {
        console.log("write prev");
        dispatch(writePrevPages());
      }
    }

    // если на 11, то загрузаю prevPages
    // если на 10, то делаю writePages()
  }, [dispatch, page]);

  useEffect(() => {
    // если нет страниц
    // то делает запрос на сервер
    if (!pages) {
      console.log("fetch");
      dispatch(fetchBook({ slug: slug, page: page }));
    }
  }, [dispatch]);

  const log = {
    prevPages: prevPages,
    pages: pages,
    nextPages: nextPages,
    // loading: loading,
    // error: error,
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
  function changeDirection(direction) {
    setIsNext(direction);
  }

  return (
    <div>
      <BookRetrieveHeader />
      <Pages page={page} />
      <Link to={`/book/${slug}/${parseInt(page) - 1}`}>
        <button
          style={{ position: "fixed", bottom: 74 + "px" }}
          type="button"
          className="btn btn-primary"
          onClick={() => setIsNext(false)}
        >
          Prev
        </button>
      </Link>
      <Link to={`/book/${slug}/${parseInt(page) + 1}`}>
        <button
          style={{ position: "fixed", bottom: 74 + "px", right: 0 + "px" }}
          type="button"
          className="btn btn-primary"
          onClick={() => setIsNext(true)}
        >
          Next
        </button>
      </Link>
    </div>
  );
}

export default BookRetrieve;
