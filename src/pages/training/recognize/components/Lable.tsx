import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FalseSetItem, Recognize } from "../../common/training";
import { Round } from "../../common/round";

interface LableProps {
    word: FalseSetItem
    index: number
    roundObj: Round
    trainingObj: Recognize
}

// Компонент Lable отвечает за отображение варианта ответа и стилей во время ответа
const Lable: React.FC<LableProps> = (
    { word, index, roundObj, trainingObj }
) => {

    const defaultClass = "btn btn-dark-list position-relative w-100 mb-4 py-3"
    const wrongClass = `${defaultClass} box-danger`
    const correctClass = `${defaultClass} box-success`

    const [className, setClassName] = useState('')

    useEffect(() => {
        setClassName(defaultClass)
    }, [roundObj.round]); 

    useEffect(() => {
        if (roundObj.isViewResult) {
            
            if (roundObj.selectedLable !== null) {
                console.log(roundObj.selectedLable, index, word.isCorrect)
                if (roundObj.selectedLable == index) {
                    console.log(word.isCorrect ? correctClass : wrongClass)
                    setClassName(word.isCorrect ? correctClass : wrongClass)
                }
            }
            if (word.isCorrect) {
                setClassName(correctClass)
            }
        }
    }, [roundObj.isViewResult]);    


    function handleAnswerClick() {
        roundObj.setSelectedLable(index)
        roundObj.setAnswer(word.text) 
        roundObj.handleFinalAnswer(trainingObj)
    }



    return (
        <div>
            <label
                className={className}
                onClick={() => handleAnswerClick()}>
                    <b className="fs-5">{word.translation}</b>
                    <kbd className="press_button d-none d-sm-block">Num {index+1}</kbd>
            </label>
        </div>
    );
}

export default Lable;
