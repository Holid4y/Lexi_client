import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SVG from "../../../common/components/Icons/SVG";
import Loading from "../../../common/components/Treatment/Loading";

function InfoCard() {
    const { learning_words, upload_books, loading } = useSelector((state) => state.home);

    const getContentOrLoading = (content) => {
        return loading && content === null ? <Loading /> : <h4 className="book-text text-center py-2">{content}</h4>;
    };

    return (
        <div className="row mb-4">
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="wordsToLearn">Изученных слов</span>
                <Link to={"/word-list"}>
                    <div className="card card-btn">
                        {getContentOrLoading(learning_words)}
                    </div>
                </Link>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="uploadBooks">Добавленных книг</span>
                <Link to={"/"}>
                    <div className="card card-btn">
                        {getContentOrLoading(upload_books)}
                    </div>
                </Link>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="statistics">Статистика</span>
                <Link to="/statistic">
                    <div className="card w-100 border-none card-btn">
                        <h4 className="book-text text-center py-2">
                            <SVG name="statistic" />
                        </h4>
                    </div>
                </Link>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity">
                <span className="ps-2" id="bookmarks">Закладки</span>
                <Link to="/bookmarks">
                    <div className="card w-100 border-none card-btn">
                        <h4 className="book-text text-center py-2">
                            <SVG name="marklist_fill" />
                        </h4>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default InfoCard;
