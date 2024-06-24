import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewWord = () => {
    const { text, part_of_speech, transcription, translations, synonyms, meanings, loading, error } = useSelector((state) => state.word);

    useEffect(() => {
        console.log(text, part_of_speech, transcription, translations, synonyms, meanings);
    }, [text]);

    return <div></div>;
};

export default ViewWord;
