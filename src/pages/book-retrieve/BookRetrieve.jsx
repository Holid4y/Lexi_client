import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { fetchBook } from "../../common/reducers/bookRetrieveSlice";
import { fetchBookmarksCreateUpdate } from "../../common/reducers/bookmarkSlice";

import BookRetrieveHeader from "./components/BookRetrieveHeader";
import Pages from "./components/Pages";
import PaginationButton from "./components/PaginationButton";

function BookRetrieve() {
  const dispatch = useDispatch();
  const { pages, page_count, loading, error } = useSelector(
    (state) => state.book
  );
  const [isNext, setIsNext] = useState(true);
  const { slug, page } = useParams();

  useEffect(() => {
    // если store пустой
    // то делает запрос на сервер
    if (!pages) {
      console.log("fetch");
      dispatch(fetchBook({ slug: slug, page: page }));
      return 
    }

    // если четная 50 страница,
    // то делает запрос на сервер
    if (isNext) {
      if ((page - 1) % 50 == 0) {
        console.log("fetch");
        dispatch(fetchBook({ slug: slug, page: page }));
      }
    } else {
      if (page % 50 == 0) {
        console.log("fetch prev");
        dispatch(fetchBook({ slug: slug, page: page - 1 }));
      }
    }
  }, [dispatch, slug, page]);
  

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

  return (
    <div>
      <BookRetrieveHeader page={page}/>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {pages && <Pages page={page} />}
          <PaginationButton
            page={page}
            page_count={page_count}
            slug={slug}
            setIsNext={setIsNext}
          />
        </>
      )}
    </div>
  );
}

export default BookRetrieve;
