import React from "react";

const BookCard = ({ book }) => {

  return (
    <div class="card text-end mb-4 w-100 bg-card-dark">
        <div class="card-body">
            <h5 class="card-title text-start mb-3"><b>{book.title}</b></h5>
            <div class="card-text card-text-lr">
                <span><b class="fs-1">{book.page_count}</b> стр</span>
                <span>{book.author}</span>
            </div>
        </div>
    </div>
  );
};

export default BookCard;
