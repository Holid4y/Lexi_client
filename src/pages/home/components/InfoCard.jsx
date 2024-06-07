import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { renderResponse } from "../../../../public/urls";

import { Link } from "react-router-dom";

function InfoCard() {
  const { learning_words, upload_books, loading, error } = useSelector(
    (state) => state.home
  );

  return (
    <div className="row pt-2">
      <div className="col-6 col-md-4 hover-text-opacity">
        <span className="ps-2" id="wordsToLearn">Изученных слов</span>
        <div className="card">
          <h4 className="book-text text-center py-2">
            {renderResponse(learning_words, '...', loading, error)}
          </h4>
        </div>
      </div>
      <div className="col-6 col-md-4 hover-text-opacity">
        <span className="ps-2" id="wordsToLearn">Добавленных книг</span>
        <div className="card">
          <h4 className="book-text text-center py-2">
            {renderResponse(upload_books, '...', loading, error)}
          </h4>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <a href="#" className="text-white hover-text-opacity">
          <span className="ps-2" id="wordsToLearn">Статистика</span>
          <div className="card w-100 border-none card-btn">
            <h4 className="book-text text-center py-2">
              <img src="/assets/images/statistic.svg" height={"40px"} alt="" />
            </h4>
          </div>
        </a>
      </div>
      {/* <div class="col-12 col-md-4">
                    <a href="#" class="text-white">
                        <span class="ps-2">Добавить книгу</span>
                        <div class="card mb-4 w-100 border-none card-btn">
                            <h4 class="book-text text-center py-2">+</h4>
                        </div>
                    </a>
                </div> */}
    </div>
  );
}

export default InfoCard;
