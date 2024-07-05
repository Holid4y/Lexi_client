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

    const [timeTouchStart, setTimeTouchStart] = useState(0);
    const [timeTouchEnd, setTimeTouchEnd] = useState(0);
    const [className, setClassName] = useState("sentences");

    const [timePushed, setTimePushed] = useState(0);

    useEffect(() => {

      
        if (timeTouchStart !== 0 && timePushed === 0) {

      
          let interval = setInterval(() => {
            setTimePushed((prevTime) => prevTime + 100);
          }, 100);
      
          return () => clearInterval(interval);
        } 
      
        if (timeTouchEnd !== 0 && timePushed !== 0) {

          setTimePushed(0);
        } 
      }, [timeTouchStart, timeTouchEnd]);

    useEffect(() => {
        if (timePushed > 300) {
            setClassName("sentences push-start")
        }
        if (timePushed > 700) {
            handleTranslate()
            setTimeTouchStart(0);
            setTimeTouchEnd(0)
        }
      }, [timePushed]);



    const handleTouchStart = () => {
        const now = new Date().getTime()
        setTimeTouchStart(now);
        
    };

    const handleTouchEnd = () => {
        setTimeTouchEnd(new Date().getTime());
        setClassName("sentences")
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        // Здесь вы можете обработать событие контекстного меню
        // и остановить его распространение
        event.stopPropagation();
    };

    return (
        <span onTouchStart={() => handleTouchStart()} key={index} className={className} onTouchEnd={() => handleTouchEnd()} onContextMenu={handleContextMenu}>
            <SpanWord sentences={sentences} />
            <TranslationButton handleTranslate={handleTranslate} />
            {showTranslation && <span className="translation">{translation}</span>}
        </span>
    );
}

export default Sentences;
