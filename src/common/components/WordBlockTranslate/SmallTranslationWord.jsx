import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleWordBlock } from "../../reducers/wordSlice";
import { fetchVocabularyPost, fetchVocabularyDelete } from "../../reducers/vocabularySlice";

import Loading from "../Treatment/Loading";
import SVG from "../Icons/SVG";

function SmallTranslationWord({ translation, related_pk }) {
    const dispatch = useDispatch();
    const [isRelatedWord, setIsRelatedWord] = useState(false);

    useEffect(() => {

        if (related_pk) {
            setIsRelatedWord(related_pk.includes(translation.pk));
        }  
    }, []);

    const handleAddWordToVocabulary = (pk) => {
        dispatch(fetchVocabularyPost(pk));
        setIsRelatedWord(true);
    };

    const handleDeleteWordToVocabulary = (related_pk) => {
        dispatch(fetchVocabularyDelete(related_pk));
        setIsRelatedWord(false);
    };

    return (
        <button className="btn btn-secondary m-1">
            <span className="pe-2">{translation.text}</span>
            {isRelatedWord ? (
                <button className="btn" onClick={() => handleDeleteWordToVocabulary(related_pk)}>
                    <SVG name="fill_star" />
                </button>
            ) : (
                <button className="btn" onClick={() => handleAddWordToVocabulary(pk)}>
                    <SVG name="Unfill_star" />
                </button>
            )}
        </button>
    );
}

export default SmallTranslationWord;
