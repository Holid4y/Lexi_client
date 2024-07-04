import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchWordPost, toggleWordBlock, cleanStateWord } from "../../../../common/reducers/wordSlice"


const SpanWord = ({ sentences }) => {
  const dispatch = useDispatch();

  const handleWordClick = (word) => {
    dispatch(fetchWordPost(word));
    dispatch(cleanStateWord());
    dispatch(toggleWordBlock());
  };

  const addSpanTags = () => {
    let words = sentences.split(/\s+/);
    let result = [];
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let punctuation = word.match(/[^a-zA-Z0-9]+$/);
      let wordWithoutPunctuation = word.replace(/[^a-zA-Z0-9]+$/, "");
      if (wordWithoutPunctuation) {
        result.push(
          <span className="word-for-text" key={i} onClick={() => handleWordClick(wordWithoutPunctuation)}>
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

  return (
    <>
      {addSpanTags()}
    </>
  );
};

export default SpanWord;
