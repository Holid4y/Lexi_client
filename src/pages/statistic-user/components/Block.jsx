import React from "react";

function Block({ countWords, index }) {
    return (
        <div className="col">
            <div className="card statistic-block">
                <h4 className="text-center pt-3">{countWords}</h4>
                <span>L{index + 1}</span>
            </div>
        </div>
    );
}

export default Block;
