import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTrainingPatch, decrementTrainingInfo } from "../../../common/reducers/training/trainingSlice";

import { setAnswer, nextRound, addScore } from "../../../common/reducers/training/trainingRoundSlice";

function AnswerButton({ localType, currentTraining, setIsEnd, setIsViewResult }) {
    const dispatch = useDispatch();
    const { answer, training, round } = useSelector((state) => state.trainingRound);

    const [isCorrect, setIsCorrect] = useState(null);

    function performRoundSwitch() {
        if (round + 1 === training.length) {
            setIsEnd(true); // отображаем страницу окончания
        } else {
            dispatch(nextRound()); // отображает следующий раунд
        }
        setIsViewResult(false);
    }

    function checkRound(is_correct) {
        if (is_correct) {
            // прибавляем балл за правельный ответ
            dispatch(addScore());
            setIsViewResult(true);
            // Это позволяет добавить задержку перед переключением на следующий раунд
            const correctTime = 1000;
            const wrongTime = 0;

            const timeCallDown = is_correct ? correctTime : wrongTime;

            setTimeout(performRoundSwitch, timeCallDown);
        } else {
            setIsViewResult(true);
        }
    }

    // Функция для обработки финального ответа
    function handleFinalAnswer() {
        if ((answer !== null) & (answer !== "")) {
            const is_correct = checkAnswer(answer);
            const data = {
                type: localType,
                pk: currentTraining[round].pk,
                is_correct: is_correct,
            };
            console.log(answer, is_correct);
            // отнимаем от информационного счетчика 1
            dispatch(decrementTrainingInfo());

            dispatch(fetchTrainingPatch(data)); // отбовляет бд

            dispatch(setAnswer(null)); // Сбрасываем выбранный вариант для следующего раунда
            checkRound(is_correct);
        } else {
            // Если ничего не выбрано, можно вывести предупреждение или сделать кнопку неактивной
            console.log("Пожалуйста, выберите ответ");
        }
    }

    // Функция для проверки ответа
    function checkAnswer(answerWord) {
        const cleanWord = answerWord.trim().toLowerCase();
        const resultBool = currentTraining[round].word.text == cleanWord;
        setIsCorrect(resultBool);
        return resultBool;
    }

    const AnswerButton = (
        <button
            type="text"
            className={`btn btn-primary save-btn py-2 w-50 ${(answer === null) | (answer === "") ? "disabled" : ""}`}
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
