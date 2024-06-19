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
      <div className="col-6 col-md-3 hover-text-opacity">
        <span className="ps-2" id="wordsToLearn">Изученных слов</span>
        <div className="card">
          <h4 className="book-text text-center py-2">
            {renderResponse(learning_words, '...', loading, error)}
          </h4>
        </div>
      </div>
      <div className="col-6 col-md-3 hover-text-opacity">
        <span className="ps-2" id="wordsToLearn">Добавленных книг</span>
        <div className="card">
          <h4 className="book-text text-center py-2">
            {renderResponse(upload_books, '...', loading, error)}
          </h4>
        </div>
      </div>
      <div className="col-6 col-md-3 hover-text-opacity">
        <Link to="/statistic">
          <span className="ps-2" id="wordsToLearn">Статистика</span>
          <div className="card w-100 border-none card-btn">
            <h4 className="book-text text-center py-2 color-svg ">
              <svg width="31" height="31" viewBox="0 0 31 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0714 3.32143C11.0714 1.48772 12.5592 0 14.3929 0H16.6071C18.4408 0 19.9286 1.48772 19.9286 3.32143V27.6786C19.9286 29.5123 18.4408 31 16.6071 31H14.3929C12.5592 31 11.0714 29.5123 11.0714 27.6786V3.32143ZM0 16.6071C0 14.7734 1.48772 13.2857 3.32143 13.2857H5.53571C7.36942 13.2857 8.85714 14.7734 8.85714 16.6071V27.6786C8.85714 29.5123 7.36942 31 5.53571 31H3.32143C1.48772 31 0 29.5123 0 27.6786V16.6071ZM25.4643 4.42857H27.6786C29.5123 4.42857 31 5.91629 31 7.75V27.6786C31 29.5123 29.5123 31 27.6786 31H25.4643C23.6306 31 22.1429 29.5123 22.1429 27.6786V7.75C22.1429 5.91629 23.6306 4.42857 25.4643 4.42857Z" fill="currentColor"/>
              </svg>
            </h4>
          </div>
        </Link>
      </div>
      <div className="col-6 col-md-3 hover-text-opacity">
          <Link to="/word-list">
            <span className="ps-2" id="wordsToLearn">Все слова</span>
            <div className="card w-100 border-none card-btn">
                <h4 className="book-text text-center py-2 color-svg ">
                  <svg width="31" height="37" viewBox="0 0 31 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.64286 0C2.97545 0 0 3.10742 0 6.9375V30.0625C0 33.8926 2.97545 37 6.64286 37H26.5714H28.7857C30.0105 37 31 35.9666 31 34.6875C31 33.4084 30.0105 32.375 28.7857 32.375V27.75C30.0105 27.75 31 26.7166 31 25.4375V2.3125C31 1.0334 30.0105 0 28.7857 0H26.5714H6.64286ZM6.64286 27.75H24.3571V32.375H6.64286C5.41808 32.375 4.42857 31.3416 4.42857 30.0625C4.42857 28.7834 5.41808 27.75 6.64286 27.75ZM8.85714 10.4062C8.85714 9.77031 9.35536 9.25 9.96429 9.25H23.25C23.8589 9.25 24.3571 9.77031 24.3571 10.4062C24.3571 11.0422 23.8589 11.5625 23.25 11.5625H9.96429C9.35536 11.5625 8.85714 11.0422 8.85714 10.4062ZM9.96429 13.875H23.25C23.8589 13.875 24.3571 14.3953 24.3571 15.0312C24.3571 15.6672 23.8589 16.1875 23.25 16.1875H9.96429C9.35536 16.1875 8.85714 15.6672 8.85714 15.0312C8.85714 14.3953 9.35536 13.875 9.96429 13.875Z" fill="currentColor"/>
                  </svg>
                </h4>
            </div>
          </Link>
      </div>
    </div>
  );
}

export default InfoCard;
