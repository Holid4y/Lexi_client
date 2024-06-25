import React from "react";

function Block({ countWords, index }) {
    return (
        <div className="col" role="button">
            <div className="card statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                <h4 className="text-center">{countWords}</h4>
                <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                    <span className="d-block">L{index + 1}</span>
                </div>
            </div>
        </div>
    );
}

export default Block;
