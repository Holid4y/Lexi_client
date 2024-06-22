import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import { fetchBooks } from "../../common/reducers/booksSlice.js";
import BookCard from "./components/book-card/BookCard.jsx";
import Skeleton from "./components/skeleton/Skeleton.jsx";
import Search from "../../common/components/Search.jsx";

import Navigation from "../../common/components/Navigation.jsx";

function BookList() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const currentPage = useSelector((state) => state.page);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchBooks(currentPage));
  }, [dispatch, currentPage]);

  // Обработчик изменения значения поиска
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="align-items-center">
      <Search onChange={handleSearchChange} />
      <main className="container">
        <div className="row g-4">
        {(books && books.results && books.results
        .filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()) )
        .map((book, index) => (
            <Link key={`${book.pk}-${index}`} to={`/book/${book.slug}/${book.bookmark && book.bookmark.target_page || 1}`} className="col-12 col-md-6">
              <BookCard book={book} />
            </Link>
          ))) ||
          (loading ? <Skeleton /> : <p>Error: {error}</p>)}
        </div>
      </main>
    </div>
  );
}

export default BookList;
