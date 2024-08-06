import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleWordBlock } from "../../../reducers/wordSlice";
import { fetchVocabularyPost, fetchVocabularyDelete } from "../../../reducers/vocabularySlice";

import Loading from "../../Treatment/Loading";
import SVG from "../../Icons/SVG";

function SmallTranslationWord({ wordPk, translation, related_pk }) {
    const dispatch = useDispatch();
    const [isRelatedWord, setIsRelatedWord] = useState(false);

    useEffect(() => {

        if (related_pk) {
            setIsRelatedWord(related_pk.includes(translation.pk));
        }  
    }, []);

    const handleAddWordToVocabulary = (wordPk, translationPk) => {
        const body = {
            word: wordPk,
            translation: translationPk,
        };
        dispatch(fetchVocabularyPost(body));
        setIsRelatedWord(true);
    };

    const handleDeleteWordToVocabulary = (wordPk, translationPk) => {
        const body = {
            word: wordPk,
            translation: translationPk,
        };
        dispatch(fetchVocabularyDelete(body));
        setIsRelatedWord(false);
    };

    return (
        <button className="btn btn-secondary m-1">
            <span className="pe-2">{translation.text}</span>
            {isRelatedWord ? (
                <button className="btn" onClick={() => handleDeleteWordToVocabulary(wordPk, translation.pk)}>
                    <SVG name="fill_star" />
                </button>
            ) : (
                <button className="btn" onClick={() => handleAddWordToVocabulary(wordPk, translation.pk)}>
                    <SVG name="Unfill_star" />
                </button>
            )}
        </button>
    );
}

export default SmallTranslationWord;
