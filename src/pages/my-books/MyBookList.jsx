import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBooks } from "../../common/reducers/booksSlice";

import Search from "../../common/components/Headers/Search";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";
import BookCard from "../books/components/BookCard";
import { myBooks as myBooksPath } from "../../../public/urls";

function MyBookList() {
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        if (!searchResults) {
            dispatch(fetchMyBooks(currentPage));
        }
    }, [currentPage, dispatch, searchResults]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleClearSearch = () => {
        setSearchResults(null); // Очистить результаты поиска
    };

    const filteredBooks = searchResults || books;

    const BooksMyView = (
        <div className="mb-4">
            <div className="row g-3">
                {filteredBooks && filteredBooks.results && filteredBooks.results.length > 0 ? (
                    filteredBooks.results.map((book, index) => (
                        <BookCard book={book} isMyBook={true} key={index} index={index}/>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="card py-3">
                            <div className="text-center">
                                <h4 className="fw-bold mt-3 text-body-emphasis px-2">
                                    Вы можете добавить свою книгу или текст 🥰
                                </h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const PaginationButtonView =
        books?.page_count > 1 && (
            <PaginationButton
                currentPage={currentPage}
                pageCount={books?.page_count}
                setCurrentPage={setCurrentPage}
            />
        );

    return (
        <div className="align-items-center">
            <Search title="Мои книги" endpoint={myBooksPath} onSearch={handleSearchResults} onClear={handleClearSearch} />
            {loading ? (
                <Loading />
            ) : (
                <main className="container pb-5 mb-3">
                    {BooksMyView}
                    {PaginationButtonView}
                </main>
            )}
        </div>
    );
}

export default MyBookList;
