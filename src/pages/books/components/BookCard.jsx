import React from "react";
import { Link } from "react-router-dom";

import Dropdown from "./Dropdown";

const BookCard = ({ book, isMyBook, index }) => {

    return (
        <div className="col-12 col-md-6">
            <div className="card text-end w-100 bg-card-dark">
                <Link to={`/book/${book.slug}/${(book.bookmark && book.bookmark.target_page) || 1}`}>
                    <div className="card-body">
                        <h5 className="card-title text-start mb-3 d-flex justify-content-between align-items-center">
                            <b className="text-truncate w-75">{book.title}</b>
                        </h5>
                        <div className="card-text card-text-lr align-items-end">
                            <span>
                                <b className="fs-2">{book.page_count}</b> стр
                            </span>
                            <span className="text-truncate w-75 pb-1 pe-2">{book.author}</span>
                        </div>

                    </div>
                </Link>
                {isMyBook && <Dropdown book={book} index={index}/>}
            </div>
        </div>
    );
};

export default BookCard;
