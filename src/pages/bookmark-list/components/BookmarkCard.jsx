import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SVG from "../../../common/components/Icons/SVG";
import { useDispatch } from "react-redux";
import { fetchBookmarksDelete, fetchBookmarksCreateUpdate } from "../../../common/reducers/bookmarkSlice";

const BookmarkCard = ({ bookmark }) => {
    const dispatch = useDispatch();
    const [isBookmarked, setIsBookmarked] = useState(true);

    const handleIconClick = (bookmarkId, bookId, targetPage) => {
        if (isBookmarked) {
            setIsBookmarked(false);
            dispatch(fetchBookmarksDelete(bookmarkId));
        } else {
            setIsBookmarked(true);
            const data = {
                bookId: bookId,
                targetPage: targetPage,
            };
            dispatch(fetchBookmarksCreateUpdate(data));
        }
    };

    return (
        <div className="col-12 col-md-6">
            <div className="card text-end bg-card-dark w-100">
                <Link to={`/book/${bookmark.book_cover.slug}/${bookmark.target_page}`}>
                    <div className="card-body">
                        <h5 className="card-title text-start mb-3">
                            <b>{bookmark.book_cover.title}</b>
                        </h5>
                        <div className="card-text card-text-lr">
                            <span>
                                <b className="fs-1">{bookmark.target_page}</b> стр
                            </span>
                            <span>{bookmark.book_cover.author}</span>
                        </div>
                    </div>
                </Link>
                {/* на это надо нажимать и должна меняться иконка */}
                <span className="position-absolute translate-middle mark" onClick={() => handleIconClick(bookmark.pk, bookmark.book_cover.book_id, bookmark.target_page)}>
                    {isBookmarked ? (
                        <SVG name="marklist_fill"/>
                    ) : (
                        <SVG name="marklist_Unfill"/>
                    )}
                </span>
            </div>
        </div>
    );
};

export default BookmarkCard;
