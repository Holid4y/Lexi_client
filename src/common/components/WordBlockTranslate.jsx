import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWordBlock } from "../reducers/wordSlice";

function WordBlockTranslate() {
  const dispatch = useDispatch();
  const { text, part_of_speech, transcription, translations, synonyms, meanings, isVisible, loading, error } = useSelector((state) => state.word);

  useEffect(() => {
    function handleClickOutside(event) {
      const wordBlock = document.getElementById("wordBlock");
      if (wordBlock && !wordBlock.contains(event.target)) {
        dispatch(toggleWordBlock());
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, dispatch]);

  return (
    <div id="wordBlock" className={`toggle-block ${isVisible ? 'show' : ''}`}>
      <div className="px-3 py-2">
        <div>
          <span className="fs-2 pe-3 text-capitalize"><b>{text}</b></span>
          <span>[{transcription}] {part_of_speech}</span>
        </div>
        <span>
          <b>
            {translations && translations.length > 0 ? (
              <div>
                <span className="pe-2 text-capitalize">{translations[0].text}</span>
                <input className="form-check-input ms-2" type="checkbox" value="" />
              </div>
            ) : (
              loading ? 'Loading...' : ''
            )}
            <hr />
          </b>
        </span>
        {translations && translations.length > 0 ? (
          <div>
            <b>Переводы:</b><br />
            {translations.map((translation, index) => (
              <span className="pe-2 text-break" key={index}>{translation.text}</span>
            ))}
            <hr />
          </div>
        ) : (
          loading ? 'Loading...' : ''
        )}
        {synonyms && synonyms.length > 0 ? (
          <div>
            <b>Синонимы:</b><br />
            {synonyms.map((synonym, index) => (
              <span className="pe-2 text-break" key={index}>{synonym.text}</span>
            ))}
            <hr />
          </div>
        ) : (
          loading ? 'Loading...' : ''
        )}
        
        {meanings && meanings.length > 0 ? (
          <div>
            <b>Значения:</b><br />
            {meanings.map((meaning, index) => (
              <span className="pe-2 text-break" key={index}>{meaning.text}</span>
            ))}
          </div>
        ) : (
          loading ? 'Loading...' : ''
        )}
      </div>
    </div>
  );
}

export default WordBlockTranslate;
