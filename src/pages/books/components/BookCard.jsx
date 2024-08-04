import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import SVG from "../../../common/components/Icons/SVG";
import { fetchBookDelete } from "../../../common/reducers/bookRetrieveSlice";

const BookCard = ({ book, isMyBook }) => {
    const dispatch = useDispatch()

    function handleDelete(pk, slug) {
        // отобразить модальное окно подсверждения
        // если пользователь подтвердил то:
        dispatch(fetchBookDelete(pk))

        if (isBookRecently(slug)) {
            throwRecentlyBook()
        }
    }

    function throwRecentlyBook()  {
        localStorage.removeItem("recentlyBook");
    };
    function isBookRecently(slug) {
        const recentlyBook = localStorage.getItem("recentlyBook");
        
        if (recentlyBook) {
            const recentlyBookData = JSON.parse(recentlyBook);
            
            if (recentlyBookData.slug) {
                return recentlyBookData.slug === slug;
            }
        }
        

        return false;
    }
    

    const Trash = (
        <span className="position-absolute translate-middle mark" onClick={() => handleDelete(book.pk, book.slug)}>
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
