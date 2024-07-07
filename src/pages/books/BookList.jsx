import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../common/reducers/booksSlice.js";
import BookCard from "./components/BookCard.jsx";
import Search from "../../common/components/Headers/Search.jsx";
import Loading from "../../common/components/Treatment/Loading.jsx";
import PaginationButton from "../../common/components/Pagination/PagePagination.jsx";
import { Link } from "react-router-dom";

function BookList() {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBooks(currentPage));
  }, [dispatch, currentPage]);

  const LoadingView = <Loading />;
  const SearchView = <Search />;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="align-items-center">
      {SearchView}
      {loading ? (
        LoadingView
      ) : (
        <main className="container pb-5">
          <div className="row g-4">
            {books && books.results && books.results.length > 0 ? (
              books.results.map((book, index) => (
                <Link key={`${book.pk}-${index}`} to={`/book/${book.slug}/${(book.bookmark && book.bookmark.target_page) || 1}`} className="col-12 col-md-6">
                    <BookCard book={book} />
                </Link>
              ))
            ) : (
                <div className="text-center mt-5">
                    <div className="px-4 pt-5 mt-5 text-center">
                        <h1 className="fw-bold mt-3 text-body-emphasis">У нас пока что нет книг 😔</h1>
                        <div className="col-lg-8 mx-auto">
                            <p className="lead mb-4">
                                Вы можете загрузить собственный файл или написать текст непосредственно нажав на кнопку
                                'Добавить книгу'
                            </p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                                <button type="button" className="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                    Добавить книгу
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>
          <PaginationButton currentPage={currentPage} pageCount={books ? Math.ceil(books.count / 2) : 1} onPageChange={handlePageChange} setIsNext={(isNext) => {}}/>
        </main>
      )}
    </div>
  );
}

export default BookList;
