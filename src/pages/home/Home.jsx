import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../../common/reducers/homeSlice";

import InfoCard from "./components/InfoCard";
import BooksLinkCard from "./components/BooksLinkCard";
import WorsHistory from "./components/WorsHistory";

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

    return (
        <div className="align-items-center">
            <div className="container sticky-top mb-3 pt-2">
                <nav className="navbar dark-nav px-3">
                    <span className="navbar-brand">Главная</span>
                    <div class="dropdown dropstart">
                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </button>
                        <ul class="dropdown-menu">
                            <li><Link class="dropdown-item" to="/profile">Профиль</Link></li>
                            <li><button class="dropdown-item" type="button">Настройки</button></li>
                            <li><Link class="dropdown-item" to="/login">Выйти</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="container pb-5">
                <InfoCard />
                <BooksLinkCard />
                <WorsHistory />

                <div className="pagination-position d-flex justify-content-center">
                    {continueReadingUrl && (
                        <Link to={continueReadingUrl}>
                            <button type="button" className="btn btn-primary px-4">
                                Продолжить читать
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
