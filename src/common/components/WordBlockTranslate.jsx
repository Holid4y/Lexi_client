import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleWordBlock } from "../reducers/wordSlice";
import { fetchVocabularyPost, fetchVocabularyDelete } from "../reducers/vocabularySlice";

import Loading from "../components/Treatment/Loading";
import SVG from "../../common/components/Icons/SVG";

function WordBlockTranslate() {
    const dispatch = useDispatch();

    const { pk, text, part_of_speech, transcription, translations, synonyms, meanings, related_pk, isVisible, loading, error } = useSelector(
        (state) => state.word
    );

    const [isRelatedWord, setIsRelatedWord] = useState(false);

    useEffect(() => {
        setIsRelatedWord(related_pk)
    }, [text]);
    
    useEffect(() => {
        
        
        function handleClickOutside(event) {
            const wordBlock = document.getElementById("wordBlock");
            if (wordBlock && !wordBlock.contains(event.target)) {
                dispatch(toggleWordBlock());
            }
        }

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.classList.add("no-scroll");
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.classList.remove("no-scroll");
        };
    }, [isVisible, dispatch]);

    const handleAddWordToVocabulary = (pk) => {
        dispatch(fetchVocabularyPost(pk));
        setIsRelatedWord(true)
    };
    const handleDeleteWordToVocabulary = (related_pk) => {
        dispatch(fetchVocabularyDelete(related_pk));
        setIsRelatedWord(false)
    };

    return (
        <div>
            <div className="modal-backdrop fade show" style={{ display: isVisible ? "block" : "none" }}></div>
            <div id="wordBlock" className={`toggle-block ${isVisible ? "show" : ""}`}>
                <div className="px-3 py-2">
                    {(translations && translations.length > 0) || (synonyms && synonyms.length > 0) || (meanings && meanings.length > 0) ? (
                        <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span className="fs-2 pe-3 text-capitalize">
                                    <b>{text}</b>
                                </span>
                                <span>[ {transcription} ]</span>
                                <button className="btn">
                                    <SVG name="voice_min" />
                                </button>
                                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                                    {isRelatedWord ? (
                                        <button className="btn" onClick={() => handleDeleteWordToVocabulary(related_pk)}>
                                            <SVG name="fill_star" />
                                        </button>
                                    ) : (
                                        <button className="btn" onClick={() => handleAddWordToVocabulary(pk)}>
                                            <SVG name="Unfill_star" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <span className="pe-2 text-capitalize">
                                    <b>{translations[0].text}</b> - {part_of_speech}
                                </span>
                            </div>
                            <hr />
                            <b>Переводы:</b>
                            <br />
                            {translations.map((translation, index) => (
                                <span className="pe-2 text-break" key={index}>
                                    {translation.text}
                                </span>
                            ))}
                            <hr />
                            <b>Синонимы:</b>
                            <br />
                            {synonyms.map((synonym, index) => (
                                <span className="pe-2 text-break" key={index}>
                                    {synonym.text}
                                </span>
                            ))}
                            <hr />
                            <b>Значения:</b>
                            <br />
                            {meanings.map((meaning, index) => (
                                <span className="pe-2 text-break word-for-text" key={index}>
                                    {meaning.text}
                                </span>
                            ))}
                        </div>
                    ) : loading ? (
                        <Loading />
                    ) : (
                        <div className="text-center">
                            <span className="text-danger">Не найдено</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WordBlockTranslate;
