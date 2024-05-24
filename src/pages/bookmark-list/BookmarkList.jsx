import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "./bookmarkListSlice";


function BookmarkList() {
  const dispatch = useDispatch();
  const { bookmarks, loading, error } = useSelector(state => state.bookmarks);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const log = {
    'bookmarks': bookmarks, 
    'loading': loading, 
    'error': error 
  }
  console.log(log)

}

export default BookmarkList;
