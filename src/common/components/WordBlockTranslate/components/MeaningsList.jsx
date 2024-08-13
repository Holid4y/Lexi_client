import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWordPost, cleanStateWord } from "../../../../common/reducers/wordSlice"

function MeaningsList() {
    const dispatch = useDispatch();
    const { meanings } = useSelector((state) => state.word);

    const handleWordClick = (word) => {
        dispatch(fetchWordPost(word));
        dispatch(cleanStateWord());
    };

    const addSpanTags = (text) => {
        let words = text.split(/\s+/);
        let result = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let punctuation = word.match(/[^a-zA-Z0-9]+$/);
            let wordWithoutPunctuation = word.replace(/[^a-zA-Z0-9]+$/, "");
            if (wordWithoutPunctuation) {
                result.push(
                    <span className="text-break" key={`${text}-${i}`} onClick={() => handleWordClick(wordWithoutPunctuation)}>
                        {wordWithoutPunctuation}
                    </span>
                );
            }
            if (punctuation) {
                result.push(punctuation[0]);
            }
            result.push(" ");
        }
        return result.slice(0, -1); // Удаляем последний пробел
    };

    function isExist() {
        return meanings.length > 0;
    }

    const MeaningsView = (
        <div>
            <b>Значения:</b>
            <br />
            {meanings.map((meaning, index) => (
                <React.Fragment key={index}>
                    <button className="btn btn-outline-primary me-2 my-1">{addSpanTags(meaning.text)}</button>
                </React.Fragment>
            ))}
        </div>
    );

    return <>{isExist() && MeaningsView}</>;
}

export default MeaningsList;
