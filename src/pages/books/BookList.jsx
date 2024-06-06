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

  useEffect(() => {
    dispatch(fetchBooks(currentPage));
  }, [dispatch, currentPage]);

  const log = {
    books: books,
    loading: loading,
    error: error,
  };
  console.log(log);

  return (
    <div className="align-items-center">
      <Search />
      <main className="container px-4">
        {(books &&
          books.results &&
          books.results.map((book, index) => (
            <Link key={`${book.pk}-${index}`} to={`/book/${book.slug}`}>
              <BookCard book={book} />
            </Link>
          ))) ||
          (loading ? <Skeleton /> : <p>Error: {error}</p>)}
      </main>
      <Navigation />
    </div>
  );
}

export default BookList;
