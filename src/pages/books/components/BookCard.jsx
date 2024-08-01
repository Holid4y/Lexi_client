import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import SVG from "../../../common/components/Icons/SVG";
import { fetchBookDelete } from "../../../common/reducers/bookRetrieveSlice";

const BookCard = ({ book, isMyBook }) => {
    const dispatch = useDispatch()

    function handleDelete(pk) {

        dispatch(fetchBookDelete(pk))
        // отобразить модальное окно подсверждения
    }
    const Trash = (
        <span className="position-absolute translate-middle mark" onClick={() => handleDelete(book.pk)}>
            <SVG name="trash" />
        </span>
    );

    return (
        <div className="col-12 col-md-6">
            <div className="card text-end w-100 bg-card-dark ">
                <Link to={`/book/${book.slug}/${(book.bookmark && book.bookmark.target_page) || 1}`}>
                    <div className="card-body">
                        <h5 className="card-title text-start mb-3 d-flex justify-content-between align-items-center">
                            <b>{book.title}</b>
                        </h5>
                        <div className="card-text card-text-lr">
                            <span>
                                <b className="fs-1">{book.page_count}</b> стр
                            </span>
                            <span>{book.author}</span>
                        </div>
                    </div>
                </Link>
                {isMyBook && Trash}
            </div>
        </div>
    );
};

export default BookCard;
