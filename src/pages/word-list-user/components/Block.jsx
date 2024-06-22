import React from "react";

import BlockContent from "./BlockContent";

function Block({ word, index, toggleCardBody, visibleCardBodies }) {
  return (
    <div className="col" role="button" onClick={() => toggleCardBody(index)}>
    
      <div className="card statistic pt-3">
        <h4 className="text-center p-3 pb-1">{word.text}</h4>
        <p>
          <span className="text-start">[{word.transcription}]</span>
          <span className="text-end">{word.part_of_speech}</span>
        </p>
        
        <div className={`card-body p-3 collapse text-white ${visibleCardBodies[index] ? "show" : ""}`}>
          {visibleCardBodies[index] ? <BlockContent pk={word.pk}/> : ''}
        </div> 
      </div>
    </div>
  );
}

export default Block;
