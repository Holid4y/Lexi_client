import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function LastReadBook() {
    const dispatch = useDispatch();
    const [continueReadingUrl, setContinueReadingUrl] = useState(null);
    const [titleLastBook, settitleLastBook] = useState("");
    const [progress, setProgress] = useState(0);

    const [isView, setIsView] = useState(false);

    function setLastReadBook(storedData) {
        const { slug, page, title, maxPage } = JSON.parse(storedData);
        const url = `/book/${slug}/${page}`;
        setContinueReadingUrl(url);
        settitleLastBook(title);

        const progressPercentage = (page / maxPage) * 100;
        
        setProgress(Math.round(progressPercentage));
    }

    useEffect(() => {
        const storedData = localStorage.getItem("recentlyBook");
        if (storedData) {
            setLastReadBook(storedData);
            setIsView(true);
        } else {
            setIsView(false);
        }
    }, [dispatch]);

    const ViewLastReadBookBlock = (
        <div className="hover-text-opacity animated-block-leftright">
            <span className="ps-2 span_hover" id="wordsToLearn">
                Вы читали ранее
            </span>
            <div className="card text-end mb-3 w-100 bg-card-dark p-2 animated-block-rightleft">
                <div className="card-body">
                    <h3 className="card-title text-start">{titleLastBook}</h3>
                    <div className="row d-flex align-items-end">
                        <div className="col-6 col-md-8">
                            <div class="progress bg-progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar" style={{ width: `${progress}%` }}>
                                    {progress}%
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
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
            </div>
        </div>
    );

    return <>{isView && ViewLastReadBookBlock}</>;
}

export default LastReadBook;