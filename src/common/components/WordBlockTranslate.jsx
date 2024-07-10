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
    const [showSection2, setShowSection2] = useState(false);

    useEffect(() => {
        setIsRelatedWord(related_pk);
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
            setShowSection2(false); // Если добавить комментарий этой строки, Section-2 будет отображаться всегда, пока не нажмут на кнопку
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.classList.remove("no-scroll");
        };
    }, [isVisible, dispatch]);

    const handleAddWordToVocabulary = (pk) => {
        dispatch(fetchVocabularyPost(pk));
        setIsRelatedWord(true);
    };

    const handleDeleteWordToVocabulary = (related_pk) => {
        dispatch(fetchVocabularyDelete(related_pk));
        setIsRelatedWord(false);
    };

    const renderContent = () => {
        if (loading) {
            return <div className="dark-nav mb-2"><Loading/></div>;
        }

        if ((translations && translations.length > 0) || (synonyms && synonyms.length > 0) || (meanings && meanings.length > 0)) {
            return (
                <>
                    <div className="dark-nav mb-2 p-3">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span className="fs-2 pe-3 text-capitalize">
                                <b>{text}</b> - <b>{translations[0]?.text}</b>
                            </span>
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
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span className="pe-2 text-capitalize">
                                <span>[ {transcription} ]</span>
                                {/* {part_of_speech} */}
                                <button className="btn">
                                    <SVG name="voice_min" />
                                </button>
                            </span>
                            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                                <button className="btn btn-link" onClick={() => setShowSection2(!showSection2)}>
                                    {showSection2 ? "Скрыть" : "Подробнее"}
                                </button>
                            </div>
                        </div>
                    </div>
                    {showSection2 && (
                        <div id="section-2" className="dark-nav mb-2 p-3">
                            {translations.length > 0 && (
                                <div>
                                    <b>Переводы:</b>
                                    <br />
                                    {translations.map((translation, index) => (
                                        <button className="btn btn-secondary m-1" key={index}>
                                            <span className="pe-2">{translation.text}</span>
                                            <SVG name="Unfill_star_btn" />
                                        </button>
                                    ))}
                                </div>
                            )}
                            {synonyms.length > 0 && (
                                <div>
                                    <hr />
                                    <b>Синонимы:</b>
                                    <br />
                                    {synonyms.map((synonym, index) => (
                                        <span className="pe-2 text-break" key={index}>
                                            {synonym.text}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {meanings.length > 0 && (
                                <div>
                                    <hr />
                                    <b>Значения:</b>
                                    <br />
                                    {meanings.map((meaning, index) => (
                                        <span className="pe-2 text-break word-for-text" key={index}>
                                            {meaning.text}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            );
        }

        return (
            <div className="text-center dark-nav mb-2 p-3">
                <span className="text-danger">Не найдено</span>
            </div>
        );
    };

    return (
        <div>
            <div className="modal-backdrop fade show" style={{ display: isVisible ? "block" : "none" }}></div>
            <div id="wordBlock" className={`toggle-block ${isVisible ? "show" : ""}`}>
                <div id="section-1">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default WordBlockTranslate;
