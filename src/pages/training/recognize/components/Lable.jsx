import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleFinalAnswer } from "../../common/utils";

function Lable({ word, index, correctWord, performRoundSwitch }) {
    const dispatch = useDispatch();
    const { answer, training, round, isViewResult } = useSelector((state) => state.trainingRound);
    const [classState, setClassState] = useState("");

    const [localSelectedAnswer, setLocalSelectedAnswer] = useState(null);
    const [localCorrectWord, setLocalCorrectWord] = useState(correctWord);

    useEffect(() => {
        setClassState("btn btn-dark-list w-100 mb-3 py-3");
        setLocalCorrectWord(correctWord);
        if (isViewResult) {
            setClass();
        }
    }, [isViewResult]);


    function setClass() {
        // подсветить выбранный ответ красным, а правельный зеленым по верх красного
        if (word.text === localSelectedAnswer) {
            setClassState(`${classState} box-danger`);
        }
        if (word.text === localCorrectWord) {
            setClassState(`${classState} box-success`);
        }
    }

    return (
        <label
            className={classState}
            htmlFor={`option_${index}`}
            onClick={() => {
                handleFinalAnswer(word.text, "recognize", training, round, dispatch, performRoundSwitch);
                setLocalSelectedAnswer(word.text);
            }}
        >
            {word.translation}
        </label>
    );
}

export default Lable;
