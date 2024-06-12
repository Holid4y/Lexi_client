import React from 'react';
import { Link } from 'react-router-dom';

const PaginationButton = ({ page, page_count, slug, setIsNext }) => {
  return (
    <div>
      <Link to={`/book/${slug}/${parseInt(page) - 1}`}>
        {page == 1 ? (
          <button
            style={{ position: "fixed", bottom: 74 + "px" }}
            type="button"
            className="btn btn-primary"
            disabled
          >
            Prev
          </button>
        ) : (
          <button
            style={{ position: "fixed", bottom: 74 + "px" }}
            type="button"
            className="btn btn-primary"
            onClick={() => setIsNext(false)}
          >
            Prev
          </button>
        )}
      </Link>
      <Link to={`/book/${slug}/${parseInt(page) + 1}`}>
        {page_count == page ? (
          <button
            style={{ position: "fixed", bottom: 74 + "px", right: 0 + "px" }}
            type="button"
            className="btn btn-primary"
            disabled
          >
            Next
          </button>
        ) : (
          <button
            style={{ position: "fixed", bottom: 74 + "px", right: 0 + "px" }}
            type="button"
            className="btn btn-primary"
            onClick={() => setIsNext(true)}
          >
            Next
          </button>
        )}
      </Link>
    </div>
  );
};

export default PaginationButton;
