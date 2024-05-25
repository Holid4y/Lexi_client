import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../common/reducers/bookRetrieveSlice";


function BookRetrieve() {
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector(state => state.book);

  useEffect(() => {
    dispatch(fetchBook('mr-hicks-alexie-aaron'));
  }, [dispatch]);

  const log = {
    'book': book, 
    'loading': loading, 
    'error': error 
  }
  console.log(log)

}

export default BookRetrieve;
