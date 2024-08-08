import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../common/reducers/bookRetrieveSlice";

import { setRecentlyBookToLocalStorage } from "./utils/utils";

import BookRetrieveHeader from "./components/BookRetrieveHeader";
import Pages from "./components/Pages";
import PaginationButton from "../../common/components/Pagination/PagePagination";
import Loading from "../../common/components/Treatment/Loading";
import ProgressBar from "./components/ProgressBar";

function BookRetrieve() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const containerRef = useRef(null);

    const { pk, pages, page_count, title, pages_slice, loading, error } = useSelector((state) => state.book);
    const { slug, page } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(page));
    const [isFirstInit, setIsFirstInit] = useState(true);

    useEffect(() => {
        navigate(`/book/${slug}/${currentPage}`);
    }, [currentPage]);

    function isOutRange() {
        const minPage = pages_slice && pages_slice[0];
        const maxPage = pages_slice && pages_slice[1];
        return currentPage < minPage || currentPage > maxPage;
    }
    useEffect(() => {
        if (!isFirstInit) {
            if (isOutRange()) {
                // только когда выйдет за range
                dispatch(fetchBook({ slug: slug, page: currentPage}));
            }
        }

        setRecentlyBookToLocalStorage(slug, currentPage, page_count, title);
    }, [page]); // при каждом изменение страницы

    useEffect(() => {
        if (isFirstInit) {
            dispatch(fetchBook({ slug: slug, page: currentPage})).then((data) => {
                
                const title = data.payload.title
                const page_count = data.payload.page_count
                setRecentlyBookToLocalStorage(slug, currentPage, page_count, title);
                
                if (data.payload.redirected) {
                    setCurrentPage(data.payload.redirectedPage);
                }
            });
            
            
            setIsFirstInit(false);
        }
    }, [slug]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: "smooth" }); // прокрутка до контейнера
        }
    }, [page]);

    const LoadingView = <Loading />;
    const Header = <BookRetrieveHeader pk={pk} page={page} />;
    const Page = <Pages page={page} />;
    const Pagination = <PaginationButton currentPage={currentPage} pageCount={page_count} setCurrentPage={setCurrentPage} />;

    return (
        <div ref={containerRef} className="align-items-center">
            {error === 404 ? (
                "PageNotFound"
            ) : (
                <>
                    {Header}
                    <ProgressBar />
                    {loading ? (
                        LoadingView
                    ) : (
                        <main className="container pb-5 mb-3">
                            {pages && Page}
                            {Pagination}
                        </main>
                    )}
                </>
            )}
        </div>
    );
}

export default BookRetrieve;
