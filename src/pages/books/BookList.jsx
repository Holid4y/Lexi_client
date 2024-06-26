import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchBooks } from "../../common/reducers/booksSlice.js";
import BookCard from "./components/BookCard.jsx";
import Skeleton from "./components/Skeleton.jsx";
import Search from "../../common/components/Search.jsx";

function BookList() {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);
    const currentPage = useSelector((state) => state.page);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        dispatch(fetchBooks(currentPage));
    }, [dispatch, currentPage]);

    // Обработчик изменения значения поиска
    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    return (
        <div className="align-items-center">
            <div className="container sticky-top mb-3 pt-2">
                <nav className="navbar dark-nav">
                    <div className="container-fluid">
                        <Search onChange={handleSearchChange} />
                    </div>
                </nav>
            </div>
            <main className="container">
                <div className="row g-4">
                    {(books &&
                        books.results &&
                        books.results
                            .filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((book, index) => (
                                <Link key={`${book.pk}-${index}`} to={`/book/${book.slug}/${(book.bookmark && book.bookmark.target_page) || 1}`} className="col-12 col-md-6">
                                    <BookCard book={book} />
                                </Link>
                            ))) ||
                        (loading ? <Skeleton /> : <p>Error: {error}</p>)}
                </div>
            </main>
        </div>
    );
}

export default BookList;
