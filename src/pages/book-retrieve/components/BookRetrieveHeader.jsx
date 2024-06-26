import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderResponse } from "../../../../public/urls";
import { fetchBookmarksDelete, fetchBookmarksCreateUpdate } from "../../../common/reducers/bookmarkSlice";
import SVG from "../../../common/components/Icons/SVG";

const BookRetrieveHeader = ({ pk, page }) => {
    const dispatch = useDispatch();
    const { title, page_count, author, bookmark, loading, error } = useSelector((state) => state.book);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [previousPage, setPreviousPage] = useState(page);

    useEffect(() => {
        // проверяет, есть ли закладка на этой странице
        if (bookmark) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [bookmark]);

    useEffect(() => {
        // Запускается только после изменения страницы
        if (page !== previousPage) {
            if (isBookmarked) {
                const data = {
                    bookId: pk,
                    targetPage: page,
                };
                dispatch(fetchBookmarksCreateUpdate(data));
            }
            setPreviousPage(page);
        }
    }, [dispatch, page]);

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
        <div className="container mb-4 pt-2">
            <div className="card text-end mb-4 w-100 bg-card-dark">
                <div className="card-body">
                    <div className="mb-2 card-text-lr">
                        <h5 className="card-title text-start">
                            <b>{renderResponse(title, "...", loading, error)}</b>
                        </h5>
                        {isBookmarked ? (
                            <label className="btn" htmlFor="btn-check-4" onClick={() => handleIconClick(bookmark.pk, null, null)}>
                                <SVG name="marklist_fill"/>
                            </label>
                        ) : (
                            <label className="btn" htmlFor="btn-check-4" onClick={() => handleIconClick(null, pk, page)}>
                                <SVG name="marklist_Unfill"/>
                            </label>
                        )}
                    </div>
                    <div className="card-text card-text-lr">
                        <span>
                            <b className="fs-1">
                                {page}/{renderResponse(page_count, "...", loading, error)}
                            </b>{" "}
                            стр
                        </span>
                        <span>{renderResponse(author, "...", loading, error)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookRetrieveHeader;
