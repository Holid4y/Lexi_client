import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { fetchBook } from "../../common/reducers/bookRetrieveSlice";

import BookRetrieveHeader from "./components/BookRetrieveHeader";
import Pages from "./components/Pages";
import PaginationButton from "./components/PaginationButton";

function BookRetrieve() {
  const dispatch = useDispatch();
  const { pk, pages, page_count, loading, error } = useSelector(
    (state) => state.book
  );
  const [isNext, setIsNext] = useState(true);
  const { slug, page } = useParams();

  useEffect(() => {
    // если четная 50 страница и не равно первой,
    // то делает запрос на сервер
    if (isNext & page != 1) {
      if ((page - 1) % 50 == 0) {
        dispatch(fetchBook({ slug: slug, page: page }));
      }
    } else {
      if (page % 50 == 0) {
        dispatch(fetchBook({ slug: slug, page: page - 1 }));
      }
    }
  }, [dispatch, page]);
  
  useEffect(() => {
    dispatch(fetchBook({ slug: slug, page: page }));
  }, [dispatch, slug]);

  return (
    <div>
      <BookRetrieveHeader pk={pk} page={page}/>

      {loading ? (
        <p>Loading...</p> ) : (
        <>
          {pages && <Pages page={page} />}
          <PaginationButton page={page} page_count={page_count} slug={slug} setIsNext={setIsNext} />
        </>
      )}
    </div>
  );
}

export default BookRetrieve;
