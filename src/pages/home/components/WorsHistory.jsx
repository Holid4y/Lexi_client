import React from "react";
import { Link } from "react-router-dom";

function BooksLinkCard() {
  return (

    <div className="hover-text-opacity">
        <span className="ps-2" id="wordsToLearn">Недавно добавленные слова</span>
        <div class="card mb-4 p-4 word-history">
            <div className="row g-3 px-2">
                <span class="col-12 col-md-6 border-bottom">Door</span>
                <span class="col-12 col-md-6 border-bottom">Hello</span>
                <span class="col-12 col-md-6 border-bottom">World</span>
                <span class="col-12 col-md-6 border-bottom">Birds</span>
                <span class="col-12 col-md-6 border-bottom">Snow</span>
                <span class="col-12 col-md-6 border-bottom">White</span>
                <span class="col-12 col-md-6 border-bottom">Black</span>
                <span class="col-12 col-md-6 border-bottom">Cat</span>
                <span class="col-12 col-md-6 border-bottom">Windows</span>
            </div>
        </div>
    </div>
  );
}

export default BooksLinkCard;
