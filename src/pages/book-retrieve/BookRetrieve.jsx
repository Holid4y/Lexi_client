import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchBook } from "../../common/reducers/bookRetrieveSlice";
import { fetchBookmarksCreateUpdate } from "../../common/reducers/bookmarkSlice";
import Navigation from "../../common/components/navigation/Navigation"

function BookRetrieve() {
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector(state => state.book);
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

  const renderPagination = () => {
    const totalPages = book.page_count;
    const pagesToShow = 3;
    const startPage = Math.max(1, currentPageIndex - 1);
    const endPage = Math.min(totalPages, currentPageIndex + 1);

    const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <li key={i} className={`page-item ${i === currentPageIndex ? 'active' : ''}`}>
            <a className="page-link text-white" href="#" onClick={() => handlePageChange(i)}>
              {i}
            </a>
          </li>
        );
      }

      return (
        <ul className="pagination">
          <li className={`page-item ${currentPageIndex === 1 ? 'disabled' : ''}`}>
            <a className="page-link text-white" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPageIndex - 1)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pages}
          <li className={`page-item ${currentPageIndex === totalPages ? 'disabled' : ''}`}>
            <a className="page-link text-white" href="#" aria-label="Next" onClick={() => handlePageChange(currentPageIndex + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      );
    };

  return (
    
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {book && (
        <div>
          <div className="container mb-4 pt-2">
              <a href="/html/book_read.html">
                  <div className="card text-end mb-4 w-100 bg-card-dark">
                      <div className="card-body">
                          <div className="mb-2 card-text-lr">
                              <h5 className="card-title text-start"><b>{book.title}</b> </h5>
                              <input type="checkbox" className="btn-check" id="btn-check-4" autocomplete="off" />
                              <label className="btn" for="btn-check-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                  </svg>
                              </label>
                          </div>
                          <div className="card-text card-text-lr">
                              <span><b className="fs-1">{book.page_count}</b> стр</span>
                              <span>{book.author}</span>
                          </div>
                          
                      </div>
                  </div>
              </a>
          </div>
          <main className="container px-4">
                
              <div className="book-text-read">
                  <p> {book.book[currentPageIndex - 1]} </p>
              </div>
              
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
