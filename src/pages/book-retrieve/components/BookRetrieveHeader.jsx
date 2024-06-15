import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { renderResponse } from "../../../../public/urls";

import { fetchBookmarksDelete, fetchBookmarksCreateUpdate } from "../../../common/reducers/bookmarkSlice";

const BookRetrieveHeader = ({ page }) => {
  const dispatch = useDispatch();
  const { pk, title, page_count, author, bookmark, loading, error } = useSelector((state) => state.book);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (bookmark){
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false)
    }
  }, [dispatch, bookmark]);

  useEffect(() => {
    // если книга добавлена в закладки у пользователя
    // то на каждой странице обновлять закладку
    if (bookmark){
      const data = {
        bookId: pk,
        targetPage: page,
      }
      dispatch(fetchBookmarksCreateUpdate(data))
    } 
  }, [dispatch, page]);

  const handleIconClick = (bookmarkId, bookId, targetPage) => {
    if (isBookmarked){
        setIsBookmarked(false);
        dispatch(fetchBookmarksDelete(bookmarkId))
    } else {
        setIsBookmarked(true);
        const data = {
            bookId: bookId,
            targetPage: targetPage,
        }
        dispatch(fetchBookmarksCreateUpdate(data))
    }
    
  };
  return (
    <div className="container mb-4 pt-2">
      <div className="card text-end mb-4 w-100 bg-card-dark">
        <div className="card-body">
          <div className="mb-2 card-text-lr">
            <h5 className="card-title text-start">
              <b>{renderResponse(title, '...', loading, error)}</b>
            </h5>
            <>
              
              {isBookmarked ? (
                <label className="btn" htmlFor="btn-check-4" onClick={() => handleIconClick(bookmark.pk, null, null)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                  </svg>
                </label>
              ) : (
                <label className="btn" htmlFor="btn-check-4" onClick={() => handleIconClick(null, pk, page)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                  </svg>
                </label>
              )}
              
            </>
            
          </div>
          <div className="card-text card-text-lr">
            <span>
              <b className="fs-1">{page}/{renderResponse(page_count, '...', loading, error)}</b> стр
            </span>
            <span>{renderResponse(author, '...', loading, error)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRetrieveHeader;