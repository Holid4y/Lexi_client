import React from "react";

function Block({ countWords, index }) {
  return (
    <div className="col-6 col-md-3">
      <div className="card statistic mb-4">
        <h4 className="text-center">{countWords}</h4>
        <span>L{index + 1}</span>
      </div>
    </div>
  );
}

export default Block;
