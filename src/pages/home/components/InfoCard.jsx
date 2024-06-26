import React from "react";
import { useSelector } from "react-redux";
import { renderResponse } from "../../../../public/urls";
import { Link } from "react-router-dom";
import SVG from "../../../common/components/Icons/SVG";

function InfoCard() {
    const { learning_words, upload_books, loading, error } = useSelector((state) => state.home);

    return (
        <div className="row mb-4">
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="wordsToLearn">
                    Изученных слов
                </span>
                <div className="card">
                    <h4 className="book-text text-center py-2">{renderResponse(learning_words, "...", loading, error)}</h4>
                </div>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="wordsToLearn">
                    Добавленных книг
                </span>
                <div className="card">
                    <h4 className="book-text text-center py-2">{renderResponse(upload_books, "...", loading, error)}</h4>
                </div>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="wordsToLearn">
                    Статистика
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
