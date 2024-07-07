import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBook } from "../../common/reducers/bookRetrieveSlice";
import BookRetrieveHeader from "./components/BookRetrieveHeader";
import Pages from "./components/Pages";
import PaginationButton from "../../common/components/Pagination/Pagination";
import Loading from "../../common/components/Treatment/Loading";

function BookRetrieve() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pk, pages, page_count, loading } = useSelector((state) => state.book);
    const [isNext, setIsNext] = useState(true);
    const { slug, page } = useParams();

    useEffect(() => {
        let pageNumber = parseInt(page, 10);
        if (isNaN(pageNumber) || !/^\d+$/.test(page) || pageNumber < 1) {
            pageNumber = 1;
        } else if (page_count && pageNumber > page_count) {
            pageNumber = page_count;
        }

        if (pageNumber !== parseInt(page, 10)) {
            navigate(`/book/${slug}/${pageNumber}`, { replace: true });
        } else {
            localStorage.setItem('recentlyBook', JSON.stringify({ slug, page: pageNumber }));
            if (isNext && (pageNumber !== 1)) {
                if ((pageNumber - 1) % 50 === 0) { 
                    dispatch(fetchBook({ slug: slug, page: pageNumber }));
                }
            } else {
                if (pageNumber % 50 === 0) { 
                    dispatch(fetchBook({ slug: slug, page: pageNumber - 1 }));
                }
            }
        }
    }, [dispatch, page, page_count, slug, navigate, isNext]);

    useEffect(() => {
        if (page && page > 0) {
            dispatch(fetchBook({ slug: slug, page: parseInt(page, 10) }));
        }
    }, [dispatch, slug, page]);

    useEffect(() => {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar && page_count) {
            const percentage = (page / page_count) * 100;
            progressBar.style.width = `${percentage}%`;
            progressBar.setAttribute('aria-valuenow', percentage);
        }
    }, [page, page_count]);

    const LoadingView = <Loading />;
    const Header = <BookRetrieveHeader pk={pk} page={page} />;
    const Page = <Pages page={page}/>;
    const Pagination = <PaginationButton page={page} page_count={page_count} slug={slug} setIsNext={setIsNext} />;

    return (
        <div className="align-items-center">
            {Header}
            <div className="container sticky-top">
                <div className="progress progress-2" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar"></div>
                </div>
            </div>
            {loading ? ( LoadingView ) : (
                <main className="container pb-5">
                    {pages && Page}
                    {Pagination}
                </main>
            )}
        </div>
    );
}

export default BookRetrieve;
