import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchBookmarksDelete } from "../../common/reducers/bookmarkSlice";
import { fetchMyBooks } from "../../common/reducers/booksSlice";
import SVG from "../../common/components/Icons/SVG";

import BookmarkCard from "./components/BookmarkCard";

import Headers from "../../common/components/Headers/Header";
import Search from "../../common/components/Headers/Search";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";

import BookCard from "../books/components/BookCard";

import AddBookModal from "./components/AddBookModal";
import BaseModal from "./components/AddBookComponents/AllModal/BaseModal";

import FileModal from "./components/AddBookComponents/AllModal/FileModal";
import TextModal from "./components/AddBookComponents/AllModal/TextModal";
import VideoModal from "./components/AddBookComponents/AllModal/VideoModal";

function BookmarkList() {
    const dispatch = useDispatch();
    const { bookmarks, loading: bookmarksLoading, error } = useSelector((state) => state.bookmarks);
    const { books, loading: booksLoading } = useSelector((state) => state.books);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchBookmarks(currentPage));
        dispatch(fetchMyBooks());
    }, []);

    const filteredBookmarks = bookmarks?.results?.filter((bookmark) => bookmark.book_cover.title.toLowerCase());
    const LoadingView = <Loading />;
    const SearchView = <Search />;
    const BooksMarkView = (
        <div className="mb-4">
            <p className="w-100 mb-2 d-flex justify-content-between align-items-center px-2">
                <h4 className="p-0">Мои закладки</h4>
                <Link to="/books" className="p-0 mb-0 text-end ms-auto link-color">
                    Выбрать книгу
                </Link>
            </p>
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

    const BooksMyView = (
        <div className="mb-4">
            <p className="w-100 mb-2 d-flex justify-content-between align-items-center px-2">
                <h4 className="p-0">Мои книги</h4>
                <span type="button" className="p-0 mb-0 text-end ms-auto link-color" data-bs-toggle="modal" data-bs-target="#AddBookModal">
                    {/* data-bs-target="#exampleModal1" */}
                    Добавить книгу
                </span>
            </p>
            <div className="row g-3 px-2">
                {books && books.results.length > 0 ? (
                    books.results.map((book, index) => <BookCard book={book} isMyBook={true} key={index} />)
                ) : (
                    <div className="card py-3">
                        <div className="text-center">
                            <h4 className="fw-bold mt-3 text-body-emphasis">Добавьте книгу 😔</h4>
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
            {bookmarksLoading | booksLoading ? (
                LoadingView
            ) : (
                <main className="container">
                    {BooksMyView}
                    {BooksMarkView}
                    {PaginationButtonView}
                    <div>
                        <AddBookModal />
                        <BaseModal idName={'AddBookModalFile'} childComponent={<FileModal />} ariaLabelledby={"AddBookModalFileSelected"} title={'Файл'}/>
                        <BaseModal idName={'AddBookModalText'} childComponent={<TextModal />} ariaLabelledby={"AddBookModalTextSelected"} title={'Текст'}/>
                        <BaseModal idName={'AddBookModalVideo'} childComponent={<VideoModal />} ariaLabelledby={"AddBookModalVideoSelected"} title={'Видео'}/>
                    </div>
                </main>
            )}
        </div>
    );
}

export default BookmarkList;
