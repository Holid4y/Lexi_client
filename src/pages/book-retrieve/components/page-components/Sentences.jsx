import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchGoogletrans } from "../../../../common/reducers/googletransSlice";

import SpanWord from "./SpanWord";
import TranslationButton from "./TranslationButton";

function Sentences({ sentences, index }) {
    const dispatch = useDispatch();

    const [showTranslation, setShowTranslation] = useState(false);
    const [translation, setTranslation] = useState(null);

    useEffect(() => {
        setShowTranslation(false);
        setTranslation(null);
    }, [sentences]);

    const handleTranslate = () => {
        setShowTranslation(true);
        setTranslation("loading");
        // вызов API перевода
        dispatch(fetchGoogletrans(sentences)) // функция перевода
            .then((response) => {
                setTranslation(response.payload.translated_text);
            });
    };

    return (
        <span key={index} className={"sentences"}>
            <SpanWord sentences={sentences} />

            <TranslationButton handleTranslate={handleTranslate} />

            {showTranslation && <span className="translation">{translation}</span>}
        </span>
    );
}

export default Sentences;
