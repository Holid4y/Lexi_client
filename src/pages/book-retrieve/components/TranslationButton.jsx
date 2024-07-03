import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import SVG from "../../../common/components/Icons/SVG";

import { fetchGoogletrans } from "../../../common/reducers/googletransSlice";


function TranslationButton({ text }) {
    const dispatch = useDispatch();

    const { translated_text } = useSelector((state) => state.googletrans);
    const [showTranslation, setShowTranslation] = useState(false);
    const [translation, setTranslation] = useState(null);

    const handleTranslate = () => {

        // вызов API перевода
        dispatch(fetchGoogletrans(text) )// функция перевода
        .then((response) => {
            console.log(response)
            setTranslation(response.payload.translated_text);
            setShowTranslation(true);
          })
    };


    return (
        <>
            <div className="translation-button" onClick={handleTranslate}>
                <SVG name={'translate'} />
            </div>
            {showTranslation && (
                <span className="translation">{translation}</span>
            )}
        </>
    );
}

export default TranslationButton;
