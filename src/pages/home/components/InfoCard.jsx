import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SVG from "../../../common/components/Icons/SVG";
import Loading from "../../../common/components/Treatment/Loading";

function InfoCard() {
    const { learning_words, upload_books, new_words_today, loading } = useSelector((state) => state.home);

    const getContentOrLoading = (content) => {
        // Проверяем, загружен ли контент
        if (!content) {
            // Если контент не загружен, возвращаем компонент Loading
            return <Loading />;
        }
        
        // Если контент загружен, возвращаем его
        return content;
    };
    const renderNewWordsToday = (content) => {
        
        if (!content | content == 0) {
            return 
        }
        
        // Если контент загружен, отрисовываем 
        return <h4 className="book-text text-center py-2 mb-0 h4_main_block_new_words_today">+{new_words_today}</h4>;
    };
    

    return (
        <div className="row mb-3 g-3">
            <div className="col-6 col-md-3 hover-text-opacity animated-block-leftright">
                <Link to={"/word-list"}>
                    <div className="card card-btn position-relative main-block">
                        
                            <>
                                <span className="ps-2 span_main_block text-secondary" id="wordsToLearn">Всего слов</span>
                                <h4 className="book-text text-center py-2 mb-0 h4_main_block">{getContentOrLoading(learning_words)}</h4>
                                {renderNewWordsToday(new_words_today)}
                            </>
                        
                    </div>
                </Link>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity animated-block-leftright">
                <Link to={"/my-books"}>
                    <div className="card card-btn position-relative main-block">
                        <>
                            <span className="ps-2 span_main_block text-secondary" id="uploadBooks">Добавленных книг</span>
                            <h4 className="book-text text-center py-2 mb-0 h4_main_block">{getContentOrLoading(upload_books)}</h4>
                        </>
                    </div>
                </Link>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity animated-block-leftright">
                <Link to="/statistic">
                    <div className="card card-btn position-relative main-block">
                        <>
                            <span className="ps-2 span_main_block text-secondary" id="statistics">Статистика</span>
                            <h4 className="book-text text-c  enter pb-2 mb-2 h4_main_block">
                                <SVG name="statistic" />
                            </h4>
                        </>
                    </div>
                </Link>
            </div>
            <div className="col-6 col-md-3 hover-text-opacity animated-block-leftright">
                <Link to="/bookmarks">
                    <div className="card card-btn position-relative main-block">
                        <>
                            <span className="ps-2 span_main_block text-secondary" id="bookmarks">Закладки</span>
                            <h4 className="book-text text-center pb-2 mb-2 h4_main_block">
                                <SVG name="marklist_fill" />
                            </h4>
                        </>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default InfoCard;
