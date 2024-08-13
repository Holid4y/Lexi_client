import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SVG from "../../../common/components/Icons/SVG";
import { useDispatch } from "react-redux";
import { fetchBookmarksDelete, fetchBookmarksCreateUpdate } from "../../../common/reducers/bookmarkSlice";

const BookmarkCard = ({ bookmark }) => {
    const dispatch = useDispatch();
    const [isBookmarked, setIsBookmarked] = useState(true);
    const [bookmarkPk, setBookmarkPk] = useState(bookmark.pk);

    const handleIconClick = (bookmarkPk, bookId, targetPage) => {
        if (isBookmarked) {
            setIsBookmarked(false);
            dispatch(fetchBookmarksDelete(bookmarkPk));
        } else {
            setIsBookmarked(true);
            const data = {
                bookId: bookId,
                targetPage: targetPage,
            };
            dispatch(fetchBookmarksCreateUpdate(data)).then((response) => {
                setBookmarkPk(response.payload.pk)
            });
        }
    };

    const styleCardisBookmark = {
        opacity: isBookmarked ? "1" : ".3",
    };

    return (
        <div className="col-12 col-md-6">
            <div className="card text-end w-100 bg-card-dark" style={styleCardisBookmark}>
                <Link to={`/book/${bookmark.book_cover.slug}/${bookmark.target_page}`}>
                    <div className="card-body">
                        <h5 className="card-title text-start mb-3 d-flex justify-content-between align-items-center">
                            <b className="text-truncate w-75">{bookmark.book_cover.title}</b>
                        </h5>
                        <div className="card-text card-text-lr align-items-end">
                            <span>
                                <b className="fs-2">{bookmark.target_page}</b> стр
                            </span>
                            <span className="text-truncate w-75 pb-1 pe-2">{bookmark.book_cover.author}</span>
                        </div>
                    </div>
                </Link>
                {/* на это надо нажимать и должна меняться иконка */}
                <span className="position-absolute translate-middle mark" onClick={() => handleIconClick(bookmarkPk, bookmark.book_cover.book_id, bookmark.target_page)}>
                    {isBookmarked ? <SVG name="marklist_fill" /> : <SVG name="marklist_Unfill" />}
                </span>
            </div>
        </div>
    );
};

export default BookmarkCard;
