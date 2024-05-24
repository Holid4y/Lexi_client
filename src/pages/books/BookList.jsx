import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBooks } from "./booksSlice";
import styles from "./styles.module.css";
import Pagination from "../../common/components/pagination/PaginationButton.jsx";
import Search from "../../common/components/search/Search.jsx";
import BookCard from "./components/book-card/BookCard.jsx";
import Skeleton from "./components/skeleton/Skeleton.jsx";

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
    <div>
      {/* <Search /> */}
      <div className={styles.book_list}>
        {loading ? (
          <Skeleton />
        ) : (
          books &&
          books.results &&
          books.results.map((book, index) => <BookCard key={`${book.pk}-${index}`} book={book} />)
        )}
        <Pagination />
      </div>
    </div>
  );
}

export default BookList;
