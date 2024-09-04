import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FalseSetItem, Recognize } from "../../common/training";
import { RootState } from "../../../../store";
import { setSelectedLable } from "../../../../common/reducers/training/trainingRoundSlice";
import { RoundManager } from "../../common/roundManager";

interface LableProps {
    word: FalseSetItem;
    index: number;
    roundManagerObj: RoundManager
}

// Компонент Lable отвечает за отображение варианта ответа и стилей во время ответа
const Lable: React.FC<LableProps> = (
    { word, index, roundManagerObj }
) => {
    const dispatch = useDispatch();
    
    const { round, isViewResult, selectedLable } = useSelector((state: RootState) => state.trainingRound);
    
    const defaultClass = "btn btn-dark-list position-relative w-100 mb-4 py-3";
    const wrongClass = `${defaultClass} box-danger`;
    const correctClass = `${defaultClass} box-success`;

    const [className, setClassName] = useState('');

    useEffect(() => {
        setClassName(defaultClass);
    }, [round]); 

    useEffect(() => {
        if (isViewResult) {
            if (selectedLable !== null) {
                if (selectedLable === index) {
                    setClassName(word.isCorrect ? correctClass : wrongClass);
                }
            }
            if (word.isCorrect) {
                setClassName(correctClass);
            }
        }
    }, [isViewResult, selectedLable]);    

    function handleAnswerClick() {
        if (!isViewResult) { // Проверяем, можно ли кликать
            dispatch(setSelectedLable(index))
            roundManagerObj.handleFinalAnswer(word.text)
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