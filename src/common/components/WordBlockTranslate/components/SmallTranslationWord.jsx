import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchVocabularyPost, fetchVocabularyDelete } from "../../../reducers/vocabularySlice";
import SVG from "../../Icons/SVG";

function SmallTranslationWord({ wordPk, translation, related_pk }) {
    const dispatch = useDispatch();
    const [isRelatedWord, setIsRelatedWord] = useState(false);

    useEffect(() => {
        if (related_pk) {
            setIsRelatedWord(related_pk.includes(translation.pk));
        }
    }, [related_pk, translation.pk]);

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
                <span className="btn" onClick={() => handleDeleteWordToVocabulary(wordPk, translation.pk)}>
                    <SVG name="fill_star" />
                </span>
            ) : (
                <span className="btn" onClick={() => handleAddWordToVocabulary(wordPk, translation.pk)}>
                    <SVG name="Unfill_star" />
                </span>
            )}
        </button>
    );
}

export default SmallTranslationWord;
