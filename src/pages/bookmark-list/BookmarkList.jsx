import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, fetchBookmarksDelete } from "../../common/reducers/bookmarkSlice";
import { Link } from "react-router-dom";
import BookmarkCard from "./components/BookmarkCard";
import AddBook from "./components/AddBook";
import Search from "../../common/components/Headers/Search";
import Loading from "../../common/components/Treatment/Loading";

function BookmarkList() {
    const dispatch = useDispatch();
    const { bookmarks, loading, error } = useSelector((state) => state.bookmarks);

    useEffect(() => {
        dispatch(fetchBookmarks());
    }, [dispatch]);

    // Удаление закладки
    const deleteBookmark = (bookmarkId) => {
        if (bookmarkId) {
            dispatch(fetchBookmarksDelete(bookmarkId));
        } else {
            console.error("Ошибка: Невозможно удалить закладку. Отсутствует bookmarkId");
        }
    };

    const filteredBookmarks = bookmarks?.results?.filter((bookmark) => bookmark.book_cover.title.toLowerCase());
    const LoadingView = <Loading/>;
    const SearchView = <Search/>;
    const BooksMarkView = 
    <div>
        {filteredBookmarks && filteredBookmarks.length > 0 ? (
            <div className="row g-4">
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
    const BtnAddBook = <AddBook />

    return (
        <div className="align-items-center">
            {SearchView}
            {loading ? ( LoadingView ) : (
                <main className="container pb-5">
                    {BooksMarkView}
                    {BtnAddBook}
                </main>
            )}
        </div>
    );
}

export default BookmarkList;