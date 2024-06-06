import React from "react";

const BookmarkCard = ({ bookmark }) => {

  return (
    <div className="card text-end mb-4 w-100 bg-card-dark">
        <div className="card-body">
            <h5 className="card-title text-start mb-3"><b>{bookmark.book_cover.title}</b></h5>
            <div className="card-text card-text-lr">
                <span><b className="fs-1">На {bookmark.target_page}</b> странице</span>
                <span>{bookmark.book_cover.author}</span>
            </div>
        </div>
    </div>
  );
};

export default BookmarkCard;
