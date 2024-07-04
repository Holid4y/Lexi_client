import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function BooksLinkCard() {
    const dispatch = useDispatch();
    const [continueReadingUrl, setContinueReadingUrl] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('recentlyBook');
        if (storedData) {
            const { slug, page } = JSON.parse(storedData);
            const url = `/book/${slug}/${page}`;
            setContinueReadingUrl(url);
        }
    }, [dispatch]);


    return (
        <div className="pagination-position d-flex justify-content-center">
            {continueReadingUrl && (
                <Link to={continueReadingUrl}>
                    <button type="button" className="btn btn-primary px-4">
                        Продолжить читать
                    </button>
                </Link>
            )}
        </div>
    );
}

export default BooksLinkCard;
