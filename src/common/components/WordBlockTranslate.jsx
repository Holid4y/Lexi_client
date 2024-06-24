import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWordBlock } from "../reducers/wordSlice";
import Loading from "../components/Loading";

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
                                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-heart me-3" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
                                        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
                                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                                    </svg>
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
