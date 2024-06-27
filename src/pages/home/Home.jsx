import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../../common/reducers/homeSlice";
import InfoCard from "./components/InfoCard";
import BooksLinkCard from "./components/BooksLinkCard";
import WorsHistory from "./components/WorsHistory";
import SVG from "../../common/components/Icons/SVG";

function Home() {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);
    const [continueReadingUrl, setContinueReadingUrl] = useState(null);

    useEffect(() => {
        dispatch(fetchHome());
        // Чтение значения из localStorage
        const storedData = localStorage.getItem('recentlyBook');
        if (storedData) {
            const { slug, page } = JSON.parse(storedData);
            const url = `/book/${slug}/${page}`;
            setContinueReadingUrl(url);
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchHome());
    }, [dispatch]);

    const Header = 
    <div className="container sticky-top mb-3 pt-2">
        <nav className="navbar dark-nav px-3">
            <span className="navbar-brand">Главная</span>
        </nav>
    </div>

    const BtnRead = 
    <div className="pagination-position d-flex justify-content-center">
        {continueReadingUrl && (
            <Link to={continueReadingUrl}>
                <button type="button" className="btn btn-primary px-4">
                    Продолжить читать
                </button>
            </Link>
        )}
    </div>

    return (
        <div className="align-items-center">
            {Header}
            <div className="container pb-5">
                <InfoCard />
                <BooksLinkCard />
                <WorsHistory />
                {BtnRead}
            </div>
        </div>
    );
}

export default Home;
