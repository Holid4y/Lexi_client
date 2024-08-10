import React, {useState, useEffect} from "react";
import SVG from "../../Icons/SVG";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabularyPost, fetchVocabularyDelete } from "../../../reducers/vocabularySlice";

function WordTranslation({ text, translation, showSection2, setShowSection2, activeTranslationsCount }) {
    const dispatch = useDispatch();
    const { pk, related_pk, transcription, translations, synonyms, meanings } = useSelector((state) => state.word);

    const [isRelatedWord, setIsRelatedWord] = useState(false)

    useEffect(() => {
        setIsRelatedWord(related_pk.includes(translation?.pk))
    }, [related_pk]);

    const handleAddWordToVocabulary = () => {
        const body = { word: pk, translation: translation.pk };
        dispatch(fetchVocabularyPost(body));
        setIsRelatedWord(true)
    };

    const handleDeleteWordToVocabulary = () => {
        const body = { word: pk, translation: translation.pk };
        dispatch(fetchVocabularyDelete(body));
        setIsRelatedWord(false)
    };

    function isMetaExist() {
        return (translations.length > 1) | (synonyms.length > 0) | (meanings.length > 0);
    }

    const ShowButtonView = (
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            <button className="btn btn-link" onClick={() => setShowSection2(!showSection2)}>
                {showSection2 ? "Скрыть" : "Подробнее"}
            </button>
        </div>
    );

    return (
        <div className="dark-nav mb-2 p-3">
            <div style={{ display: "flex", alignItems: "center" }}>
                <span className="fs-2 pe-3 text-capitalize">
                    <b>{text}</b> - <b>{translation?.text}</b>
                </span>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                    {[...Array(activeTranslationsCount-1)].map((_, index) => (
                        <div className="px-1" key={index}><SVG name="fill_star_small" /></div> // Дополнительные звезды
                    ))}
                    {isRelatedWord ? (
                        <button className="btn" onClick={handleDeleteWordToVocabulary}>
                            <SVG name="fill_star" />
                        </button>
                    ) : (
                        <button className="btn" onClick={handleAddWordToVocabulary}>
                            <SVG name="Unfill_star" />
                        </button>
                    )}
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span className="pe-2 text-capitalize">
                    <span>[ {transcription} ]</span>
                    <button className="btn">
                        <SVG name="voice_min" />
                    </button>
                </span>
                {isMetaExist() ? ShowButtonView : null}
            </div>
        </div>
    );
}

export default WordTranslation;
