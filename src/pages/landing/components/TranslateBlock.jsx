import React, { useState } from 'react';
import SVG from "../../../common/components/Icons/SVG";
import WordBlockTranslate from '../../../common/components/WordBlockTranslate/WordBlockTranslate';

const TranslateBlock = () => {
    const [selectedWord, setSelectedWord] = useState(null); // Для хранения выбранного слова
    const [selectedSentence, setSelectedSentence] = useState(null); // Для хранения выбранного предложения

    const translations = {
        "I’m": "Я",
        "right-handed.": "правша",
        "The": "Этот",
        "deputy": "заместитель",
        "studied": "изучил",
        "him": "его",
        "for": "на",
        "a": "один",
        "moment.": "момент",
        "It’s": "Это",
        "on": "на",
        "your": "твой",
        "record.": "запись",
        "I": "Я",
        "could": "мог бы",
        "check.": "проверить",
        // Добавьте переводы для других предложений
        "I’m right-handed.": "Я правша.",
        "The deputy studied him for a moment.": "Заместитель изучил его на мгновение.",
        "It’s on your record.": "Это в твоей записи.",
        "I could check.": "Я мог бы проверить."
    };

    const handleWordClick = (word) => {
        setSelectedWord(word);
    };

    const handleSentenceClick = (sentence) => {
        setSelectedSentence(sentence);
    };

    const closeModal = () => {
        setSelectedWord(null);
    };

    return (
        <div className='container'>
            <div>
                <div className="row flex-lg-row-reverse align-items-center g-2 py-5">
                    <div className="col-12 text-center">
                        <h1 className="display-2 fw-bold text-body-emphasis mb-3">Перевод слов и предложений</h1>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="d-flex"><SVG name="hand" /><p className="lead ms-3">- нажми на слово, для перевода слова</p></div>
                        <div className="d-flex"><SVG name="translate" /><p className="lead ms-3">- нажми на кнопку, для перевода предложения</p></div>
                        <h1 className="display-2 fw-bold text-body-emphasis my-3 text-center">Пример</h1>

                        {[
                            "I’m right-handed.",
                            "The deputy studied him for a moment.",
                            "It’s on your record.",
                            "I could check."
                        ].map((sentence, index) => (
                            <div key={index} className='sentences'>
                                <button className='btn mx-0 px-0 pe-2 pb-3' onClick={() => handleSentenceClick(sentence)}>
                                    <SVG name="translate" />
                                </button>
                                {sentence.split(" ").map((word, wordIndex) => (
                                    <span 
                                        key={wordIndex} 
                                        className='fs-4 word-for-text' 
                                        onClick={() => handleWordClick(word)}
                                    >
                                        {word}{" "}
                                    </span>
                                ))}
                                
                                {selectedSentence === sentence && (
                                    <p className='mt-2 fs-5 text-secondary'>{translations[sentence]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Модальное окно для выбранного слова */}
            {selectedWord && (
                <div className="container fixed-bottom">
                    <div className="modal-overlay mx-2">
                        <div className="dark-nav mb-2 p-3 mx-2">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span className="fs-2 pe-3 text-capitalize">
                                    <b>{selectedWord}</b> - <b>{translations[selectedWord]}</b>
                                </span>
                                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                                    <button className="btn">
                                        <SVG name="Unfill_star" />
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="pe-2 fs-5">[ {selectedWord} ]</span>
                                <div style={{ marginLeft: "auto" }}>
                                    <button type='button' className="btn link-color" onClick={closeModal}>
                                        Скрыть
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TranslateBlock;
