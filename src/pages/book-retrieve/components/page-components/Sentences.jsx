import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {fetchGoogletrans} from "../../../../common/reducers/googletransSlice"

import SpanWord from "./SpanWord";
import TranslationButton from "./TranslationButton";

function Sentences({ sentences, index }) {
    const dispatch = useDispatch();

    const [showTranslation, setShowTranslation] = useState(false);
    const [translation, setTranslation] = useState(null);

    useEffect(() => {
        setShowTranslation(false)
        setTranslation(null)
    }, [sentences]);

    const handleTranslate = () => {
        // вызов API перевода
        dispatch(fetchGoogletrans(sentences)) // функция перевода
            .then((response) => {
                console.log(response);
                setTranslation(response.payload.translated_text);
                setShowTranslation(true);
            });
    };

    const [timeTouchStart, setTimeTouchStart] = useState(0)
    const [timeTouchEnd, setTimeTouchEnd] = useState(0)

    const timeLongTouch = 1000

    useEffect(() => {
        const timeDifference = timeTouchEnd - timeTouchStart
        if (timeDifference > timeLongTouch){
            console.log('это долго')
        }
        
    }, [timeTouchEnd]);

    return (
        <span 
        onTouchStart={() => setTimeTouchStart(new Date().getTime())} 
        key={index} 
        className="sentences" 
        onTouchEnd={() => setTimeTouchEnd(new Date().getTime())}
        >
            <SpanWord sentences={sentences}/>

            <TranslationButton handleTranslate={handleTranslate} />
            
            {showTranslation && (
                <span className="translation">{translation}</span>
            )}

        </span>
    );
}

export default Sentences;
