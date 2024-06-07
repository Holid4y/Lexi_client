import React from "react";
import { useSelector } from "react-redux";

import { renderResponse } from "../../../../public/urls";

const BookRetrieveHeader = () => {
  const { title, page_count, author, loading, error } = useSelector((state) => state.book);

  return (
    <div className="container mb-4 pt-2">
      <div className="card text-end mb-4 w-100 bg-card-dark">
        <div className="card-body">
          <div className="mb-2 card-text-lr">
            <h5 className="card-title text-start">
              <b>{renderResponse(title, '...', loading, error)}</b>
            </h5>
            {/* <input
              type="checkbox"
              className="btn-check"
              id="btn-check-4"
              autocomplete="off"
            />
            <label className="btn" for="btn-check-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
            </label> */}
          </div>
          <div className="card-text card-text-lr">
            <span>
              <b className="fs-1">{renderResponse(page_count, '...', loading, error)}</b> стр
            </span>
            <span>{renderResponse(author, '...', loading, error)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRetrieveHeader;