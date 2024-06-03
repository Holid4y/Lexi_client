import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

function InfoCard() {
  const { learning_words, upload_books, loading, error } = useSelector(
    (state) => state.home
  );

  const checkResponse = (response, loading, error) => {
    if (response) {
      return response;
    }
    if (!response && !loading) {
      return "...";
    }
    if (loading) {
      return "...";
    }

    if (error) {
      return "!";
    }
  };

  return (
    <div className="row">
      <div className="col-6 col-md-4">
        <span className="ps-2">Изученных слов</span>
        <div className="card mb-4">
          <h4 className="book-text text-center py-2">
            {checkResponse(learning_words, loading, error)}
          </h4>
        </div>
      </div>
      <div className="col-6 col-md-4">
        <span className="ps-2">Добавленных книг</span>
        <div className="card mb-4">
          <h4 className="book-text text-center py-2">
            {checkResponse(upload_books, loading, error)}
          </h4>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <a href="#" className="text-white">
          <span className="ps-2">Статистика</span>
          <div className="card mb-4 w-100 border-none card-btn">
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
