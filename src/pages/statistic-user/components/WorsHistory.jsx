import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SVG from "../../../common/components/Icons/SVG";
import Loading from "../../../common/components/Treatment/Loading";

function WordHistory() {
    const { recently_added_words, loading } = useSelector((state) => state.home);

    const dateOptions = { month: "long", day: "numeric" };
    const dateOptionsToday = { hour: "numeric", minute: "numeric", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };

    const getFormattedDate = (date) => {
        const dateObj = new Date(date.slice(0, -1));
        const today = new Date();
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

        if (isToday(dateObj, today)) {
            return `сегодня, ${dateObj.toLocaleTimeString("ru-RU", dateOptionsToday)}`;
        } else if (isYesterday(dateObj, yesterday)) {
            return "вчера";
        } else {
            return dateObj.toLocaleString("ru-RU", dateOptions);
        }
    };

    const isToday = (date, today) => {
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };

    const isYesterday = (date, yesterday) => {
        return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
    };

    const WordLinesView = () => {
        return (
            <div className="row g-3 px-2">
                {recently_added_words &&
                    recently_added_words.map((word, index) => (
                        <div key={index} className="col-12 border-bottom d-flex justify-content-between">
                            <span className="text-start">{word.text}</span>
                            <small className="text-end text-secondary">{getFormattedDate(word.date_added)}</small>
                        </div>
                    ))}
            </div>
        );
    };

    function getContentOrLoading(content) {
        return loading === null ? <Loading /> : content
    }

    return (
        <div className="hover-text-opacity">
            <p className="w-100 mb-0 d-flex justify-content-between px-2">
                <span className="span_hover">История слов</span>
                <Link to="/word-list" className="text-end ms-auto link-color span_hover">
                    Смотреть все
                    <SVG name={"arrow_right"} />
                </Link>
            </p>
            <div className="card mb-4 p-4 word-history">{getContentOrLoading(<WordLinesView />)}</div>
        </div>
    );
}

export default WordHistory;
