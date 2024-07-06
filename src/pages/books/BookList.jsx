import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../../common/reducers/booksSlice.js";
import BookCard from "./components/BookCard.jsx";
import Skeleton from "./components/Skeleton.jsx";
import Search from "../../common/components/Headers/Search.jsx";
import Loading from "../../common/components/Treatment/Loading.jsx";
import Errors from "../../common/components/Treatment/Errors.jsx";

function BookList() {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);
    const currentPage = useSelector((state) => state.page);
    // console.log(books) 
    // {
    //     count: 4, // количество страниц
    //     next: 2, // номер след. страницы
    //     previous: null, // номер предыдущую страницы
    //     results: Array(1) // массив с результатоми
    // }

    useEffect(() => {
        // сюда надо передавать страницу, на которую надо перейди (просто число) 
        dispatch(fetchBooks(currentPage));
    }, [dispatch, currentPage]);

    const LoadingView = <Loading/>
    const ErrorView = <Errors error={error}/>
    const SearchView = <Search/>;

    return (
        <div className="align-items-center">
            {SearchView}
            {loading ? ( LoadingView ) : (
                <main className="container pb-5">
                    <div className="row g-4">
                        {(books && books.results && books.results
                            .filter((book) => book.title.toLowerCase())
                            .map((book, index) => (
                                <Link key={`${book.pk}-${index}`} to={`/book/${book.slug}/${(book.bookmark && book.bookmark.target_page) || 1}`} className="col-12 col-md-6">
                                    <BookCard book={book} />
                                </Link>
                            ))) ||
                        (loading ? LoadingView : ErrorView)}
                    </div>
                </main>
            )}
        </div>
    );
}

export default BookList;
