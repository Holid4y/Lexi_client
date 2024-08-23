import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../common/reducers/booksSlice.js";
import { Link } from "react-router-dom";

import BookCard from "./components/BookCard.jsx";
import Search from "../../common/components/Headers/Search.jsx";
import Loading from "../../common/components/Treatment/Loading.jsx";
import PaginationButton from "../../common/components/Pagination/PagePagination.jsx";

import { books as booksPath } from "../../../public/urls.js";

function BookList() {
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        if (!searchResults) {
            dispatch(fetchBooks(currentPage));
        }
    }, [dispatch, currentPage, searchResults]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleClearSearch = () => {
        setSearchResults(null); // Очистить результаты поиска
    };

    const displayedBooks = searchResults || books;

    const PaginationButtonView = books?.page_count > 1 && <PaginationButton currentPage={currentPage} pageCount={books?.page_count} setCurrentPage={setCurrentPage} />

    return (
        <div className="align-items-center">
            <Search title="Все книги" endpoint={booksPath} onSearch={handleSearchResults} onClear={handleClearSearch} />
            {loading ? (
                <Loading />
            ) : (
                <main className="container pb-5 mb-3">
                    <div className="row g-4">
                        {displayedBooks && displayedBooks.results && displayedBooks.results.length > 0 ? (
                            displayedBooks.results.map((book, index) => (
                                <BookCard book={book} key={index} />
                            ))
                        ) : (
                            <div className="text-center mt-5">
                                <div className="px-4 pt-5 mt-5 text-center">
                                    <h1 className="fw-bold mt-3 text-body-emphasis">У нас пока что нет книг 😔</h1>
                                    <div className="col-lg-8 mx-auto">
                                        <p className="lead mb-4">Вы можете загрузить собственный файл или написать текст на странице <Link to="/my-books" className="text-primary">Мои книги</Link></p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {PaginationButtonView}
                </main>
            )}
        </div>
    );
}

export default BookList;
