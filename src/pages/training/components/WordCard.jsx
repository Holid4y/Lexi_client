import React from "react";

function WordCard({ text, lvl }) {

    return (
        <div className="card statistic mb-5 pt-4">
            <h4 className="text-center p-2">{text}</h4>
            <span className="fs-6 ms-1">L{lvl}</span>
        </div>
    );
}

export default WordCard;
