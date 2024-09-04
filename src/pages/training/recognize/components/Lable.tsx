import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FalseSetItem, Recognize } from "../../common/training";
import { RootState } from "../../../../store";

interface LableProps {
    word: FalseSetItem;
    index: number;
    trainingObj: Recognize;
}

// Компонент Lable отвечает за отображение варианта ответа и стилей во время ответа
const Lable: React.FC<LableProps> = (
    { word, index, trainingObj }
) => {
    const { round, isViewResult } = useSelector((state: RootState) => state.trainingRound);
    const defaultClass = "btn btn-dark-list position-relative w-100 mb-4 py-3";
    const wrongClass = `${defaultClass} box-danger`;
    const correctClass = `${defaultClass} box-success`;

    const [className, setClassName] = useState('');

    useEffect(() => {
        setClassName(defaultClass);
    }, [round]); 

    useEffect(() => {
        if (isViewResult) {
            // if (roundObj.selectedLable !== null) {
            //     if (roundObj.selectedLable === index) {
            //         setClassName(word.isCorrect ? correctClass : wrongClass);
            //     }
            // }
            // if (word.isCorrect) {
            //     setClassName(correctClass);
            // }
        }
    }, [isViewResult]);    

    function handleAnswerClick() {
        if (!isViewResult) { // Проверяем, можно ли кликать
            console.log('sent answer')
            // roundObj.setSelectedLable(index);
            // roundObj.setAnswer(word.text); 
            // roundObj.handleFinalAnswer(trainingObj);
        }
    }

    return (
        <div>
            <label
                className={className}
                onClick={handleAnswerClick}
            >
                <b className="fs-5">{word.translation}</b>
                <kbd className="press_button d-none d-sm-block">Num {index + 1}</kbd>
            </label>
        </div>
    );
}

export default Lable;