import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "../../common/reducers/bookmarkSlice";

import BookmarkCard from "./components/BookmarkCard";

import Search from "../../common/components/Headers/Search";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";

import { searchBookMark } from "../../../public/urls";

function BookmarkList() {
    const dispatch = useDispatch();
    const { bookmarks, loading } = useSelector((state) => state.bookmarks);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        if (!searchResults) {
            dispatch(fetchBookmarks(currentPage));
        }
    }, [currentPage, dispatch, searchResults]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleClearSearch = () => {
        setSearchResults(null); // Очистить результаты поиска
    };

    // Используем либо searchResults, либо bookmarks.results без фильтрации
    const filteredBookmarks = searchResults?.results || bookmarks?.results || [];

    const LoadingView = <Loading />;
    const SearchView = (
        <Search title="Мои закладки" endpoint={searchBookMark} onSearch={handleSearchResults} onClear={handleClearSearch} />
    );
    const BooksMarkView = (
        <div className="mb-4">
            <div className="w-100 mb-2 d-flex justify-content-between align-items-center px-2">
                <Link to="/books" className="p-0 mb-0 text-end ms-auto link-color animated-btn-focus">
                    Выбрать книгу
                </Link>
            </div>
            <div className="row g-3">
                {filteredBookmarks.length > 0 ? (
                    filteredBookmarks.map((bookmark, index) => (
                        <BookmarkCard bookmark={bookmark} key={index} />
                    ))
                ) : (
                    <div className="col-12">
                        <div className="card py-3">
                            <div className="text-center">
                                <h4 className="fw-bold mt-3 text-body-emphasis">Выберите книгу 😔</h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const PaginationButtonView =
        bookmarks?.page_count > 1 && (
            <PaginationButton
                currentPage={currentPage}
                pageCount={bookmarks?.page_count}
                setCurrentPage={setCurrentPage}
            />
        );

    return (
        <div className="align-items-center">
            {SearchView}
            {loading ? (
                LoadingView
            ) : (
                <main className="container pb-5 mb-3">
                    {BooksMarkView}
                    {PaginationButtonView}
                </main>
            )}
        </div>
    );
}

export default BookmarkList;
