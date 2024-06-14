import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { fetchBookmarksDelete, fetchBookmarksCreateUpdate } from '../../../common/reducers/bookmarkSlice';

const BookmarkCard = ({ bookmark }) => {
  const dispatch = useDispatch();
  const [isBookmarked, setIsBookmarked] = useState(true);
  

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
    <div className="card text-end w-100 bg-card-dark position-relative">
      <Link to={`/book/${bookmark.book_cover.slug}/${bookmark.target_page}`} className="col-12 col-md-6">
        <div className="card-body">
          <h5 className="card-title text-start mb-3"><b>{bookmark.book_cover.title}</b></h5>
          <div className="card-text card-text-lr">
            <span>На <b className="fs-1">{bookmark.target_page}</b> стр</span>
            <span>{bookmark.book_cover.author}</span>
          </div>
        </div>
      </Link>

      {/* на это надо нажимать и должна меняться иконка */}
      <span className="position-absolute translate-middle mark" onClick={() => handleIconClick(bookmark.pk, bookmark.book_cover.book_id, bookmark.target_page)}>
      {isBookmarked ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
          </svg>
        )}
      </span>
    </div>
  );
};

export default BookmarkCard;