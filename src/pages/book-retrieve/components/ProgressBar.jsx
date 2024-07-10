import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams} from "react-router-dom";


function ProgressBar() {
    const { page_count} = useSelector((state) => state.book);
    const { page } = useParams();

    useEffect(() => {
        const progressBar = document.querySelector(".progress-bar");
        if (progressBar && page_count) {
            const percentage = (page / page_count) * 100;
            progressBar.style.width = `${percentage}%`;
            progressBar.setAttribute("aria-valuenow", percentage);
        }
    }, [page, page_count]);

    return (
        <div className="container sticky-top">
            <div className="progress progress-2" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar"></div>
            </div>
        </div>
    );
}

export default ProgressBar;
