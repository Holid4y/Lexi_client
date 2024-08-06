import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchMyBooks } from "../../common/reducers/booksSlice";

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

function MyBookList() {
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // передать currentPage
        dispatch(fetchMyBooks());
    }, []);


    const BooksMyView = (
        <div className="mb-4">
            <p className="w-100 mb-2 d-flex justify-content-between align-items-center px-2">
                <h4 className="p-0">Мои книги</h4>
                <span type="button" className="p-0 mb-0 text-end ms-auto link-color animated-btn-focus" data-bs-toggle="modal" data-bs-target="#AddBookModal">
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
                            <h4 className="fw-bold mt-3 text-body-emphasis">Вы можете добавить свою книгу или текст 🥰</h4>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const PaginationButtonView = books?.page_count > 1 && <PaginationButton currentPage={currentPage} pageCount={books?.page_count} setCurrentPage={setCurrentPage} />

    return (
        <div className="align-items-center">
            <Headers title={'Мой контент'} svgName={'book'}/>
            <Search />
            {loading ? (
                <Loading />
            ) : (
                <main className="container">
                    {BooksMyView}
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

export default MyBookList;
