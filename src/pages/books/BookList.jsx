import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBooks } from "../../common/reducers/booksSlice.js";
import Pagination from "../../common/components/pagination/PaginationButton.jsx";
import BookCard from "./components/book-card/BookCard.jsx";
import Skeleton from "./components/skeleton/Skeleton.jsx";

import Navigation from "../../common/components/navigation/Navigation"

function BookList() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const currentPage = useSelector((state) => state.page);


  useEffect(() => {
    dispatch(fetchBooks(currentPage));
  }, [dispatch, currentPage]);

  const log = {
    'books': books, 
    'loading': loading, 
    'error': error 
  }
  console.log(log)

  return (
    <div class="align-items-center">
        <div class="container sticky-top mb-4 pt-2">
            <nav class="navbar dark-nav p-2">
                <form class="d-flex w-100" role="search">
                    <input class="form-control w-100" type="search" placeholder="Search" aria-label="Search" />
                </form>
            </nav>
        </div>
        <main class="container px-4">
          {loading ? ( <Skeleton /> ) : (
            books && books.results && books.results.map((book, index) => <BookCard key={`${book.pk}-${index}`} book={book} />)
          )}
          {/* <Skeleton /> */}
        </main>
        <Navigation />
    </div>
  );
}

export default BookList;
