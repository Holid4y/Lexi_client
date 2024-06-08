import React from "react";

function WordHistory() {
  return (

    <div className="hover-text-opacity">
        <span className="ps-2" id="wordsToLearn">Недавно добавленные слова</span>
        <div className="card mb-4 p-4 word-history">
            <div className="row g-3 px-2">
                <span className="col-12 col-md-6 border-bottom">Door</span>
                <span className="col-12 col-md-6 border-bottom">Hello</span>
                <span className="col-12 col-md-6 border-bottom">World</span>
                <span className="col-12 col-md-6 border-bottom">Birds</span>
                <span className="col-12 col-md-6 border-bottom">Snow</span>
                <span className="col-12 col-md-6 border-bottom">White</span>
                <span className="col-12 col-md-6 border-bottom">Black</span>
                <span className="col-12 col-md-6 border-bottom">Cat</span>
                <span className="col-12 col-md-6 border-bottom">Windows</span>
            </div>
        </div>
    </div>
  );
}

export default WordHistory;
