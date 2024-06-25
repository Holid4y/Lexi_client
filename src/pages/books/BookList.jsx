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
                        <Link className="pt-1 color-svg" to="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                            </svg>
                        </Link>
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
