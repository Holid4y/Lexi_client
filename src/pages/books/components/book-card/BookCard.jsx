import React from "react";
import styles from "./styles.module.css";

const BookCard = ({ book }) => {

  return (
    <div className={styles.book_card} >
      <h1 className={styles.title}>{book.title}</h1>
      <div className={styles.bottom}>
        <span className={styles.page}>{book.page_count} стр.</span>
        <p className={styles.author}>{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
