import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBook } from "../../common/reducers/bookRetrieveSlice";
import BookRetrieveHeader from "./components/BookRetrieveHeader";
import Pages from "./components/Pages";
import PaginationButton from "./components/PaginationButton";
import Loading from "../../common/components/Treatment/Loading";

function BookRetrieve() {
    const dispatch = useDispatch();
    const { pk, pages, page_count, loading } = useSelector((state) => state.book);
    const [isNext, setIsNext] = useState(true);
    const { slug, page } = useParams();

    useEffect(() => {
        localStorage.setItem('recentlyBook', JSON.stringify({ slug, page }));
        if (isNext & (page != 1)) {
            if ((page - 1) % 50 == 0) { dispatch(fetchBook({ slug: slug, page: page }));}
        } else {
            if (page % 50 == 0) { dispatch(fetchBook({ slug: slug, page: page - 1 }));}
        }
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(fetchBook({ slug: slug, page: page }));
    }, [dispatch, slug]);

    const LoadingView = <Loading />;
    const Header = <BookRetrieveHeader pk={pk} page={page} />;
    const Page = <Pages page={page}/>;
    const Pagination = <PaginationButton page={page} page_count={page_count} slug={slug} setIsNext={setIsNext} />;

    return (
        <div className="align-items-center">
            {Header}
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