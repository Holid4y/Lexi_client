import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchBookmarksDelete } from "../../common/reducers/bookmarkSlice";

import BookmarkCard from "./components/BookmarkCard";

import Headers from "../../common/components/Headers/Header";
import Search from "../../common/components/Headers/Search";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";

function BookmarkList() {
    const dispatch = useDispatch();
    const { bookmarks, loading } = useSelector((state) => state.bookmarks);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchBookmarks(currentPage));

    }, []);

    const filteredBookmarks = bookmarks?.results?.filter((bookmark) => bookmark.book_cover.title.toLowerCase());
    const LoadingView = <Loading />;
    const SearchView = <Search />;
    const BooksMarkView = (
        <div className="mb-4">
            <div className="w-100 mb-2 d-flex justify-content-between align-items-center px-2">
                <h4 className="p-0">Мои закладки</h4>
                <Link to="/books" className="p-0 mb-0 text-end ms-auto link-color animated-btn-focus">
                    Выбрать книгу
                </Link>
            </div>
            <div className="row g-3 px-2">
                {filteredBookmarks && filteredBookmarks.length > 0 ? (
                    filteredBookmarks.map((bookmark, index) => <BookmarkCard bookmark={bookmark} key={index} />)
                ) : (
                    <div className="card py-3">
                        <div className="text-center">
                            <h4 className="fw-bold mt-3 text-body-emphasis">Выберите книгу 😔</h4>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const PaginationButtonView = bookmarks?.page_count > 1 && <PaginationButton currentPage={currentPage} pageCount={bookmarks?.page_count} setCurrentPage={setCurrentPage} />

    return (
        <div className="align-items-center">
            <Headers title={'Закладки'} svgName={'marklist_fill'}/>
            {SearchView}
            {loading ? (
                LoadingView
            ) : (
                <main className="container">
                    {BooksMarkView}
                    {PaginationButtonView}
                </main>
            )}
        </div>
    );
}

export default BookmarkList;
