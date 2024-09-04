import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBooks } from "../../common/reducers/booksSlice";

import Search from "../../common/components/Headers/Search";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";

import BookCard from "../books/components/BookCard";

import AddBookModal from "./components/AddBookModal";
import BaseModal from "./components/AddBookComponents/AllModal/BaseModal";

import FileModal from "./components/AddBookComponents/AllModal/FileModal";
import TextModal from "./components/AddBookComponents/AllModal/TextModal";
import VideoModal from "./components/AddBookComponents/AllModal/VideoModal";

import { myBooks as myBooksPath } from "../../../public/urls";

function MyBookList() {
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState(null);
    const [file, setFile] = useState(null);  // Добавляем состояние для файла

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
            {/* <div className="w-100 mb-2 d-flex justify-content-between align-items-center px-2">
                <span
                    type="button"
                    className="p-0 mb-0 text-end ms-auto link-color animated-btn-focus"
                    data-bs-toggle="modal"
                    data-bs-target="#AddBookModal"
                >
                    Добавить книгу
                </span>
            </div> */}
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
                    <div>
                        <AddBookModal />
                        <BaseModal
                            idName={"AddBookModalFile"}
                            childComponent={<FileModal file={file} setFile={setFile} />}
                            ariaLabelledby={"AddBookModalFileSelected"}
                            title={"Файл"}
                        />
                        <BaseModal
                            idName={"AddBookModalText"}
                            childComponent={<TextModal />}
                            ariaLabelledby={"AddBookModalTextSelected"}
                            title={"Текст"}
                        />
                        <BaseModal
                            idName={"AddBookModalVideo"}
                            childComponent={<VideoModal />}
                            ariaLabelledby={"AddBookModalVideoSelected"}
                            title={"Видео"}
                        />
                    </div>
                </main>
            )}
        </div>
    );
}

export default MyBookList;
