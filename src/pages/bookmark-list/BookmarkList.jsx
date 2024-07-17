import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchBookmarksDelete } from "../../common/reducers/bookmarkSlice";
import { Link } from "react-router-dom";
import BookmarkCard from "./components/BookmarkCard";
import AddBook from "./components/AddBook";
import Search from "../../common/components/Headers/Search";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";

function BookmarkList() {
    const dispatch = useDispatch();
    const { bookmarks, loading, error } = useSelector((state) => state.bookmarks);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchBookmarks(currentPage));
    }, [dispatch, currentPage]);


    const filteredBookmarks = bookmarks?.results?.filter((bookmark) => bookmark.book_cover.title.toLowerCase());
    const LoadingView = <Loading/>;
    const SearchView = <Search/>;
    const BooksMarkView = 
    <div>
        <h3 className="pb-0 ps-2">Мои закладки</h3>
        {filteredBookmarks && filteredBookmarks.length > 0 ? (
            <div className="row g-4">
                {filteredBookmarks.map((bookmark, index) => (
                    <BookmarkCard bookmark={bookmark} key={index} />
                ))}
            </div>
        ) : (
            <div className="text-center mt-5">
                <div className="px-4 pt-5 mt-5 text-center">
                    <h1 className="fw-bold mt-3 text-body-emphasis">У вас пока что нет книг в избранном 😔</h1>
                    <div className="col-lg-8 mx-auto">
                        <p className="lead mb-4">
                            Вы можете выбрать книгу из предложенного списка, загрузить собственный файл или написать текст непосредственно нажав на кнопку
                            'Добавить книгу'
                        </p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                            <button type="button" className="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                Добавить книгу
                            </button>
                            <Link to="/books" className="btn btn-outline-secondary px-4">
                                Выбрать из списка
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>

    const BooksMyView = 
    <div className="mb-4">
        <h3 className="pb-0 ps-2">Мои книги</h3>
        <div className="row g-4">
            <div className="col-12 col-md-6">
                <button type="button" className="card card-btn bg-card-dark w-100 h-100 d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                    <b className="fs-1">+</b>
                </button>
            </div>
            <div className="col-12 col-md-6">
                <div className="card text-end bg-card-dark w-100">
                    <div className="card-body">
                        <h5 className="card-title text-start mb-3">
                            <b>Моя книга</b>
                        </h5>
                        <div className="card-text card-text-lr">
                            <span>
                                <b className="fs-1">12</b> стр
                            </span>
                            <span>Мой автор</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="card text-end bg-card-dark w-100">
                    <div className="card-body">
                        <h5 className="card-title text-start mb-3">
                            <b>Моя книга</b>
                        </h5>
                        <div className="card-text card-text-lr">
                            <span>
                                <b className="fs-1">12</b> стр
                            </span>
                            <span>Мой автор</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="card text-end bg-card-dark w-100">
                    <div className="card-body">
                        <h5 className="card-title text-start mb-3">
                            <b>Моя книга</b>
                        </h5>
                        <div className="card-text card-text-lr">
                            <span>
                                <b className="fs-1">12</b> стр
                            </span>
                            <span>Мой автор</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    const BtnAddBook = <AddBook />

    return (
        <div className="align-items-center">
            {SearchView}
            {loading ? ( LoadingView ) : (
                <main className="container">
                    {BooksMyView}
                    {BooksMarkView}
                    <PaginationButton currentPage={currentPage} pageCount={bookmarks?.page_count} setCurrentPage={setCurrentPage}/>
                    {BtnAddBook}
                </main>
            )}
        </div>
    );
}

export default BookmarkList;
