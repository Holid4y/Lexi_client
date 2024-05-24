import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementPage, decrementPage } from "./paginationSlice";
import styles from "./styles.module.css";


const Pagination = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);


  function existNextOrPrevious(next) {
    if (next) {
      return true;
    }
    return false;
  }

  const handlePrevPage = () => {
    if (existNextOrPrevious(books.previous)) {
      dispatch(decrementPage());
    }
  };

  const handleNextPage = () => {
    if (existNextOrPrevious(books.next)) {
      dispatch(incrementPage());
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevPage}
        disabled={!existNextOrPrevious(books.previous)}
        className={!existNextOrPrevious(books.previous) ? "disabled" : ""}
      >
        <span>&lt;</span>
      </button>
      <button
        onClick={handleNextPage}
        disabled={!existNextOrPrevious(books.next)}
        className={!existNextOrPrevious(books.next) ? "disabled" : ""}
      >
        <span>&gt;</span>
      </button>
    </div>
  );
};

export default Pagination;
