import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchBookmarksDelete } from "../../common/reducers/bookmarkSlice";
import { Link } from "react-router-dom";

import Search from "../../common/components/Search";
import Skeleton from "./components/Skeleton";
import BookmarkCard from "./components/BookmarkCard";
import AddBook from "./components/AddBook";

function BookmarkList() {
    const dispatch = useDispatch();
    const { bookmarks, loading, error } = useSelector((state) => state.bookmarks);
    const currentPage = useSelector((state) => state.page);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        dispatch(fetchBookmarks());
    }, [dispatch]);

    // Обработчик изменения значения поиска
    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    // Удаление закладки
    const deleteBookmark = (bookmarkId) => {
        if (bookmarkId) {
            dispatch(fetchBookmarksDelete(bookmarkId));
        } else {
            console.error("Ошибка: Невозможно удалить закладку. Отсутствует bookmarkId");
        }
    };

    const filteredBookmarks = bookmarks?.results?.filter((bookmark) => bookmark.book_cover.title.toLowerCase().includes(searchValue.toLowerCase()));


    const Header = 
    <div className="container sticky-top mb-3 pt-2">
        <nav className="navbar dark-nav">
            <div className="container-fluid">
                <Search onChange={handleSearchChange} />
            </div>
        </nav>
    </div>;

    const Error = <p>Error: {error}</p>;



    return (
        <div className="align-items-center">
            {Header}
            <div className="container">
                <div className="row g-4">
                    {loading ? ( <Skeleton /> ) : error ? ( Error ) : (
                        <div>
                            {filteredBookmarks && filteredBookmarks.length > 0 ? (
                                <div>
                                    {filteredBookmarks.map((bookmark, index) => (
                                        <BookmarkCard bookmark={bookmark} key={index} />
                                    ))}
                                    <div className="pagination-position">
                                        <button type="button" className="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                            {" "}
                                            Добавить книгу{" "}
                                        </button>
                                    </div>
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
                    )}
                </div>
            </div>
            <AddBook />
        </div>
    );
}

export default BookmarkList;
