import React from "react";
import { useDispatch } from "react-redux";

import { fetchTrainingPatch, decrementTrainingInfoRecognize } from "../../../common/reducers/training/trainingSlice";

import { addScore, nextRound, clearTraining, clearRound } from "../../../common/reducers/training/recognizeSlice";

function AnswerButton({ localType, selectedAnswer, setSelectedAnswer, currentTraining, currentRound, setIsEnd }) {
    const dispatch = useDispatch();

    function checkRound() {
        // после ответа, если это последный раунд
        if (currentRound + 1 == currentTraining.length) {
            setIsEnd(true); // отображаем страницу окончания
            dispatch(clearTraining()); // очищаем текущий training
            dispatch(clearRound()); // сбрасывает до первого слова
        } else {
            dispatch(nextRound()); // следующий раунд
        }
    }

    // Функция для обработки финального ответа
    function handleFinalAnswer() {
        console.log(selectedAnswer)
        if (selectedAnswer !== null & selectedAnswer !== '') {
            const is_correct = checkAnswer(selectedAnswer);
            const data = {
                type: localType,
                pk: currentTraining[currentRound].pk,
                is_correct: is_correct,
            };
            // отнимаем от информационного счетчика 1
            dispatch(decrementTrainingInfoRecognize());

            dispatch(fetchTrainingPatch(data)); // отбовляет бд

            if (is_correct) {
                // прибавляем балл за правельный ответ
                dispatch(addScore());
            }
            setSelectedAnswer(null); // Сбрасываем выбранный вариант для следующего раунда
            checkRound();
        } else {
            // Если ничего не выбрано, можно вывести предупреждение или сделать кнопку неактивной
            console.log("Пожалуйста, выберите ответ");
        }
    }

    // Функция для проверки ответа
    function checkAnswer(answerWord) {
        return currentTraining[currentRound].word.text == answerWord;
    }

    return (
        <div className="d-flex justify-content-center my-4" onClick={() => handleFinalAnswer()}>
            <button type="text" className={`btn btn-primary save-btn py-2 w-50 ${(selectedAnswer === null | selectedAnswer === '')? "disabled" : ""}`}>
                <span>
                    <b>Ответить</b>
                </span>
            </button>
        </div>
    );
}

export default AnswerButton;
