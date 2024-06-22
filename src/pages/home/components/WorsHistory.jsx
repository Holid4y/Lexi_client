import React from "react";
import { useSelector } from "react-redux";

function WordHistory() {
  const { recently_added_words, loading, error } = useSelector((state) => state.home);

  const dateOptions = { month: 'long', day: 'numeric' };
  const dateOptionsToday = { hour: 'numeric', minute: 'numeric', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };

  const getFormattedDate = (date) => {
    const dateObj = new Date(date.slice(0, -1));
  
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  
    if (dateObj.getDate() === today.getDate() && dateObj.getMonth() === today.getMonth() && dateObj.getFullYear() === today.getFullYear()) {
      return `сегодня, ${dateObj.toLocaleTimeString('ru-RU', dateOptionsToday)}`;
    } else if (dateObj.getDate() === yesterday.getDate() && dateObj.getMonth() === yesterday.getMonth() && dateObj.getFullYear() === yesterday.getFullYear()) {
      return 'вчера';
    } else {
      return dateObj.toLocaleString('ru-RU', dateOptions);
    }
  };
  

  return (
    <div className="hover-text-opacity">
      <span className="ps-2" id="wordsToLearn">Недавно добавленные слова</span>
      <div className="card mb-4 p-4 word-history">
        <div className="row g-3 px-2">
          {recently_added_words && recently_added_words.map((word, index) => (
            <div
              key={index}
              className="col-12 col-md-6 border-bottom d-flex justify-content-between"
            >
              <span className="text-start">{word.text}</span>
              <span className="text-end">{getFormattedDate(word.date_added)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WordHistory;
