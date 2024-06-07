import React from "react";

const BookCard = ({ book }) => {

  return (
    <div className="card text-end w-100 bg-card-dark">
        <div className="card-body">
            <h5 className="card-title text-start mb-3"><b>{book.title}</b></h5>
            <div className="card-text card-text-lr">
                <span><b className="fs-1">{book.page_count}</b> стр</span>
                <span>{book.author}</span>
            </div>
        </div>
    </div>
  );
};

export default BookCard;