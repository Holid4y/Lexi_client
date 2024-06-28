import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { fetchTrainingPatch, decrementTrainingInfo } from "../../../common/reducers/training/trainingSlice";

function AnswerButton({ localType, selectedAnswer, setSelectedAnswer, currentTraining, currentRound, checkRound, performRoundSwitch }) {
    const dispatch = useDispatch();
    const [isCorrect, setIsCorrect] = useState(null);
    // Функция для обработки финального ответа
    function handleFinalAnswer() {
        if ((selectedAnswer !== null) & (selectedAnswer !== "")) {
            const is_correct = checkAnswer(selectedAnswer);
            const data = {
                type: localType,
                pk: currentTraining[currentRound].pk,
                is_correct: is_correct,
            };
            console.log(selectedAnswer, is_correct);
            // отнимаем от информационного счетчика 1
            dispatch(decrementTrainingInfo());

            dispatch(fetchTrainingPatch(data)); // отбовляет бд

            setSelectedAnswer(null); // Сбрасываем выбранный вариант для следующего раунда
            checkRound(is_correct);
        } else {
            // Если ничего не выбрано, можно вывести предупреждение или сделать кнопку неактивной
            console.log("Пожалуйста, выберите ответ");
        }
    }

    // Функция для проверки ответа
    function checkAnswer(answerWord) {
        const cleanWord = answerWord.trim().toLowerCase();
        const resultBool = currentTraining[currentRound].word.text == cleanWord;
        setIsCorrect(resultBool);
        return resultBool;
    }

    const AnswerButton = (
        <button
            type="text"
            className={`btn btn-primary save-btn py-2 w-50 ${(selectedAnswer === null) | (selectedAnswer === "") ? "disabled" : ""}`}
            onClick={() => handleFinalAnswer()}
        >
            <span>
                <b>Ответить</b>
            </span>
        </button>
    );

    const NextButton = (
        <button
            type="text"
            className={`btn btn-primary save-btn py-2 w-50`}
            onClick={() => {
                performRoundSwitch();
                setIsCorrect(null);
            }}
        >
            <span>
                <b>Продолжить</b>
            </span>
        </button>
    );

    return <div className="d-flex justify-content-center my-4">{isCorrect == null ? AnswerButton : isCorrect ? AnswerButton : NextButton}</div>;
}

export default AnswerButton;
