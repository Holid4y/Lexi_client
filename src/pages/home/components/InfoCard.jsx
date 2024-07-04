import React from "react";
import { useSelector } from "react-redux";
import { renderResponse } from "../../../../public/urls";
import { Link } from "react-router-dom";
import SVG from "../../../common/components/Icons/SVG";
import Loading from "../../../common/components/Treatment/Loading";
import Error from "../../../common/components/Treatment/Errors";

function InfoCard() {
    const { learning_words, upload_books, loading, error } = useSelector((state) => state.home);

    const LoadingView = <Loading/>;
    const ErrorView = <Error error={error}/>

    return (
        <div className="row mb-4">
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="wordsToLearn">
                    Изученных слов
                </span>
                <div className="card">
                    <h4 className="book-text text-center py-2">{renderResponse(learning_words, LoadingView, loading, ErrorView)}</h4>
                </div>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="wordsToLearn">
                    Добавленных книг
                </span>
                <div className="card">
                    <h4 className="book-text text-center py-2">{renderResponse(upload_books, LoadingView, loading, ErrorView)}</h4>
                </div>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="wordsToLearn">
                    Статистика
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="ms-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </span>
                <Link to="/statistic">
                    <div className="card w-100 border-none card-btn">
                        <h4 className="book-text text-center py-2">
                            <SVG name="statistic" />
                        </h4>
                    </div>
                </Link>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="wordsToLearn">
                    Все слова
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="ms-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </span>
                <Link to="/word-list">
                    <div className="card w-100 border-none card-btn">
                        <h4 className="book-text text-center py-2">
                            <SVG name="words" />
                        </h4>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default InfoCard;
