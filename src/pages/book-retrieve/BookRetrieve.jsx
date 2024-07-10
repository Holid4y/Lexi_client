import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBook } from "../../common/reducers/bookRetrieveSlice";
import BookRetrieveHeader from "./components/BookRetrieveHeader";
import Pages from "./components/Pages";
import PaginationButton from "../../common/components/Pagination/PagePagination";
import Loading from "../../common/components/Treatment/Loading";
import ProgressBar from "./components/ProgressBar";

function BookRetrieve() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { pk, pages, page_count, pages_slice, loading } = useSelector((state) => state.book);
    const { slug, page } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(page));

    useEffect(() => {
        navigate(`/book/${slug}/${currentPage}`);
    }, [currentPage]);

    useEffect(() => {
        if (pages){
            const minPage = pages_slice && pages_slice[0];
            const maxPage = pages_slice && pages_slice[1];
            if (currentPage < minPage || currentPage > maxPage) {
                // только когда выйдет за range
                dispatch(fetchBook({ slug: slug, page: currentPage }));
            }
        }
        // при каждом изменение страницы 
        const value = {"slug":slug,"page": page};
        localStorage.setItem('recentlyBook', JSON.stringify(value));
    }, [page]);

    useEffect(() => {
        dispatch(fetchBook({ slug: slug, page: currentPage }));
    }, [slug]);

    const LoadingView = <Loading />;
    const Header = <BookRetrieveHeader pk={pk} page={page} />;
    const Page = <Pages page={page} />;
    const Pagination = <PaginationButton currentPage={currentPage} pageCount={page_count} setCurrentPage={setCurrentPage} />;

    return (
        <div className="align-items-center">
            {Header}
            <ProgressBar />
            {loading ? (
                LoadingView
            ) : (
                <main className="container pb-5">
                    {pages && Page}
                    {Pagination}
                </main>
            )}
        </div>
    );
}

export default BookRetrieve;
