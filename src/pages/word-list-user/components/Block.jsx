import React from "react";

import BlockContent from "./BlockContent";

function Block({ word, index, toggleCardBody, visibleCardBodies }) {
  return (
    <div
      className="col"
      role="button"
      onClick={() => toggleCardBody(index)}
    //   key={index}
    >
      <div className="card statistic pt-3">
        <h4 className="text-center p-2">{word.text}</h4>
        <span>[{word.transcription}]</span>
        <span>{word.part_of_speech}</span>
        
        <div className={`card-body p-3 collapse text-white ${visibleCardBodies[index] ? "show" : ""}`}>
          {visibleCardBodies[index] ? <BlockContent pk={word.pk}/> : ''}
        </div> 
      </div>
    </div>
  );
}

export default Block;
