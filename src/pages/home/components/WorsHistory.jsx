import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WordHistory() {
    const { recently_added_words, loading, error } = useSelector((state) => state.home);

    const dateOptions = { month: "long", day: "numeric" };
    const dateOptionsToday = { hour: "numeric", minute: "numeric", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };

    const getFormattedDate = (date) => {
        const dateObj = new Date(date.slice(0, -1));

        const today = new Date();
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

        if (dateObj.getDate() === today.getDate() && dateObj.getMonth() === today.getMonth() && dateObj.getFullYear() === today.getFullYear()) {
            return `сегодня, ${dateObj.toLocaleTimeString("ru-RU", dateOptionsToday)}`;
        } else if (dateObj.getDate() === yesterday.getDate() && dateObj.getMonth() === yesterday.getMonth() && dateObj.getFullYear() === yesterday.getFullYear()) {
            return "вчера";
        } else {
            return dateObj.toLocaleString("ru-RU", dateOptions);
        }
    };

    return (
        <div className="hover-text-opacity">
            <p className="w-100 mb-0 d-flex justify-content-between px-2">
                <span className="" id="wordsToLearn">
                    История слов
                </span>
                <Link to="/word-list" className="text-end ms-auto link-color" id="wordsToLearn">
                    Смотреть все
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="ms-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </Link>
            </p>
            <div className="card mb-4 p-4 word-history">
                <div className="row g-3 px-2">
                    {recently_added_words &&
                        recently_added_words.map((word, index) => (
                            <div key={index} className="col-12 border-bottom d-flex justify-content-between">
                                <span className="text-start">{word.text}</span>
                                <small className="text-end text-secondary">{getFormattedDate(word.date_added)}</small>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default WordHistory;
