import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFinalAnswer } from "../../common/utils";

// Компонент Lable отвечает за отображение варианта ответа и стилей во время ответа
function Lable({ word, index, correctWord, selectedRadioIndex }) {
    const dispatch = useDispatch();
    const { training, round, isViewResult } = useSelector((state) => state.trainingRound);

    const [classState, setClassState] = useState("");
    const [localSelectedAnswer, setLocalSelectedAnswer] = useState(null);
    const [localCorrectWord, setLocalCorrectWord] = useState(correctWord);
    const timeToViewResult = useSelector(state => state.user.time_to_view_result);

    // Обновляем состояние classState в зависимости от выбранного ответа
    useEffect(() => {
        if (index === selectedRadioIndex) {
            setClassState(`${classState} box-danger`);
            if (word.text === localCorrectWord) {
                setClassState(`${classState} box-success`);
            }
        }
    }, [selectedRadioIndex]);

    // Инициализируем состояние classState и localCorrectWord
    useEffect(() => {
        setClassState("btn btn-dark-list position-relative w-100 mb-4 py-3");
        setLocalCorrectWord(correctWord);
        if (isViewResult) {
            setClass();
        }
    }, [isViewResult]);

    // Функция для установки класса в зависимости от выбранного и правильного ответа
    function setClass() {
        if (word.text === localSelectedAnswer) {
            setClassState(`${classState} box-danger`);
        }
        if (word.text === localCorrectWord) {
            setClassState(`${classState} box-success`);
        }
    }

    return (
        <div>
            <label
            className={classState}
            htmlFor={`option_${index}`}
            onClick={() => {
                handleFinalAnswer(word.text, "recognize", training, round, dispatch, timeToViewResult);
                setLocalSelectedAnswer(word.text);
            }}>
                <b className="fs-5">{word.translation}</b>
                <kbd className="press_button d-none d-sm-block">Num {index+1}</kbd>
            </label>
        </div>
    );
}

export default Lable;
