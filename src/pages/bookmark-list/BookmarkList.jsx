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
            <div className="container">
                <div className="row g-4">
                    {loading ? ( <Skeleton /> ) : error ? ( <p>Error: {error}</p> ) : (
                        <>
                            {filteredBookmarks && filteredBookmarks.length > 0 ? (
                                <>
                                    {filteredBookmarks.map((bookmark, index) => (
                                        <BookmarkCard bookmark={bookmark} key={index} />
                                    ))}
                                    <div className="pagination-position">
                                        <button type="button" className="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                            {" "}
                                            Добавить книгу{" "}
                                        </button>
                                    </div>
                                </>
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
                        </>
                    )}
                </div>
            </div>
            <AddBook />
        </div>
    );
}

export default BookmarkList;
