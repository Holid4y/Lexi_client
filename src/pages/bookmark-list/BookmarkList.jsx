import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchBookmarksDelete } from "../../common/reducers/bookmarkSlice";
import { fetchMyBooks } from "../../common/reducers/booksSlice";
import SVG from '../../common/components/Icons/SVG';

import BookmarkCard from "./components/BookmarkCard";
import AddBook from "./components/AddBook";
import Search from "../../common/components/Headers/Search";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";
import BookCard from "../books/components/BookCard";

function BookmarkList() {
    const dispatch = useDispatch();
    const { bookmarks, loading: bookmarksLoading, error } = useSelector((state) => state.bookmarks);
    const { books, loading: booksLoading } = useSelector((state) => state.books);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchBookmarks(currentPage));
        dispatch(fetchMyBooks())
    }, []);


    const filteredBookmarks = bookmarks?.results?.filter((bookmark) => bookmark.book_cover.title.toLowerCase());
    const LoadingView = <Loading/>;
    const SearchView = <Search/>;
    const BooksMarkView =
    <div className="mb-4">
        <p className="w-100 mb-2 d-flex justify-content-between align-items-center px-2">
            <h4 className="p-0">
                Мои закладки
            </h4>
            <Link to="/books" className="p-0 mb-0 text-end ms-auto link-color">
                Выбрать книгу
            </Link>
        </p>
        <div className="row g-3 px-2">
            {filteredBookmarks && filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((bookmark, index) => (
                <BookmarkCard bookmark={bookmark} key={index} />
            ))
            ) : (
                <div className="card py-3">
                    <div className="text-center">
                        <h4 className="fw-bold mt-3 text-body-emphasis">Выберите книгу 😔</h4>
                    </div>
                </div>
            )}
        </div>
    </div>

    const BooksMyView = 
    <div className="mb-4">
        <p className="w-100 mb-2 d-flex justify-content-between align-items-center px-2">
            <h4 className="p-0">
                Мои книги
            </h4>
            <span type="button" className="p-0 mb-0 text-end ms-auto link-color" data-bs-toggle="modal" data-bs-target="#AddBookModal">{/* data-bs-target="#exampleModal1" */}
                Добавить книгу
            </span>
        </p>
        <div className="row g-3 px-2">
            {books && books.results.length > 0 ? (
            books.results.map((book, index) => (
                <BookCard book={book} isMyBook={true} key={index}/>
            ))
            ) : (
                <div className="card py-3">
                    <div className="text-center">
                        <h4 className="fw-bold mt-3 text-body-emphasis">Добавьте книгу 😔</h4>
                    </div>
                </div>
            )}
        </div>
    </div>

    return (
        <div className="align-items-center">
            {SearchView}
            {bookmarksLoading | booksLoading ? ( LoadingView ) : (
                <main className="container">
                    {BooksMyView}
                    {BooksMarkView}
                    <PaginationButton currentPage={currentPage} pageCount={bookmarks?.page_count} setCurrentPage={setCurrentPage}/>
                    <AddBook />
                    <div>
                        <div class="modal fade" id="AddBookModal" aria-hidden="true" aria-labelledby="AddBookModalLabel" tabindex="-1">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content rounded-4 shadow">
                                    <div class="modal-body p-5">
                                        <h2 class="fw-bold mb-0">Выберите вариант</h2>
                                        <ul class="d-grid gap-4 my-5 list-unstyled small">
                                            <li type="button" class="d-flex gap-4 align-items-center" data-bs-target="#AddBookModalFile" data-bs-toggle="modal">
                                                <div class="icon-40x40">
                                                    <SVG name="txt_file" />
                                                </div>
                                                <div>
                                                    <h5 class="mb-0">Файл</h5>
                                                    Выберите файл с расширением .txt
                                                </div>
                                            </li>
                                            <li type="button" class="d-flex gap-4 align-items-center" data-bs-target="#AddBookModalText" data-bs-toggle="modal">
                                                <div class="icon-40x40">
                                                    <SVG name="txt_text" />
                                                </div>
                                                <div>
                                                    <h5 class="mb-0">Текст</h5>
                                                    Скопируйте или напишите текст на английском
                                                </div>
                                            </li>
                                            <li type="button" class="d-flex gap-4 align-items-center" data-bs-target="#AddBookModalVideo" data-bs-toggle="modal">
                                                <div class="icon-40x40">
                                                    <SVG name="film" />
                                                </div>
                                                <div>
                                                    <h5 class="mb-0">Видео</h5>
                                                    Вставьте ссылку с YouTube
                                                </div>
                                            </li>
                                        </ul>
                                        <button type="button" class="btn btn-lg btn-primary mt-3 w-100" data-bs-dismiss="modal">Закрыть</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="AddBookModalFile" aria-hidden="true" aria-labelledby="AddBookModalFileLabel2" tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="AddBookModalFileLabel2">Файл</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        функционал добавления через файл
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-primary" data-bs-target="#AddBookModal" data-bs-toggle="modal">Назад</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="AddBookModalText" aria-hidden="true" aria-labelledby="AddBookModalTextLabel3" tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="AddBookModalTextLabel3">Текст</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    функционал написания текста
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-target="#AddBookModal" data-bs-toggle="modal">Назад</button>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="AddBookModalVideo" aria-hidden="true" aria-labelledby="AddBookModalVideoLabel4" tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="AddBookModalVideoLabel4">Видео</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    функционал добавления ссылки
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-target="#AddBookModal" data-bs-toggle="modal">Назад</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}

export default BookmarkList;
