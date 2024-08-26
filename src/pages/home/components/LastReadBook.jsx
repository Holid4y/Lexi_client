import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SVG from "../../../common/components/Icons/SVG";

function LastReadBook() {
    const dispatch = useDispatch();
    const [continueReadingUrl, setContinueReadingUrl] = useState(null);
    const [titleLastBook, settitleLastBook] = useState("");
    const [pageLastBook, setpageLastBook] = useState("");
    const [progress, setProgress] = useState(0);

    const [isView, setIsView] = useState(false);

    function setLastReadBook(storedData) {
        const { slug, page, title, maxPage } = JSON.parse(storedData);
        const url = `/book/${slug}/${page}`;
        const pageNum = page;
        setContinueReadingUrl(url);
        setpageLastBook(pageNum);
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
        <Link to={continueReadingUrl}>
            <div className="hover-text-opacity animated-block-leftright">
                <p className="w-100 mb-0 d-flex justify-content-between px-2">
                    <span className="span_hover">Вы читали ранее</span>
                    <span className="text-end ms-auto link-color span_hover p-0 m-0 mb-1">
                        Продолжить
                        <SVG name={"arrow_right"} />
                    </span>
                </p>
                <div className="card text-end mb-3 w-100 bg-card-dark p-2 animated-block-rightleft">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-8">
                                <div className="text-start text-break mb-4">
                                    <h3 className="card-title">{titleLastBook}</h3>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-end text-break mb-4 px-0">
                                    <span>{pageLastBook} страница</span>
                                </div>
                            </div>
                        </div>
                        <div className="progress bg-progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{ width: `${progress}%` }}>
                                {progress}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );

    return <>{isView && ViewLastReadBookBlock}</>;
}

export default LastReadBook;
