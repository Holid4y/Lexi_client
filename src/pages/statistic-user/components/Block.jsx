import React from "react";

function Block({ countWords, index }) {
  return (
    <div class="col-6 col-md-3">
      <div class="card statistic mb-4">
        <h4 class="text-center">{countWords}</h4>
        <span>L{index + 1}</span>
      </div>
    </div>
  );
}

export default Block;
