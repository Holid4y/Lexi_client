import React from "react";

const BookmarkCard = ({ bookmark }) => {

  return (
    <div className="card text-end w-100 bg-card-dark position-relative">
        <div className="card-body">
            <h5 className="card-title text-start mb-3"><b>{bookmark.book_cover.title}</b></h5>
            <div className="card-text card-text-lr">
                <span>На <b className="fs-1">{bookmark.target_page}</b> стр</span>
                <span>{bookmark.book_cover.author}</span>
            </div>
        </div>
        <span class="position-absolute translate-middle mark">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
                <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
            </svg>
        </span>
    </div>
  );
};

export default BookmarkCard;