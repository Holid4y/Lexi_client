import React from "react";
import { useDispatch } from "react-redux";

import { fetchTrainingPatch, decrementTrainingInfoRecognize } from "../../../common/reducers/training/trainingSlice";



function AnswerButton({ localType, selectedAnswer, setSelectedAnswer, currentTraining, currentRound, checkRound }) {
    const dispatch = useDispatch();

    

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

            
            setSelectedAnswer(null); // Сбрасываем выбранный вариант для следующего раунда
            checkRound(is_correct);
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
