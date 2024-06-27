import React from "react";
import { useDispatch } from "react-redux";

import { fetchTrainingPatch, decrementTrainingInfoRecognize } from "../../../common/reducers/training/trainingSlice";

function AnswerButton({ localType, selectedAnswer, setSelectedAnswer, currentTraining, currentRound, checkRound, decrementTrainingInfo, isCorrect, hasAnswered, nextRoundManually }) {
    const dispatch = useDispatch();

    function handleFinalAnswer() {
        if (selectedAnswer !== null && selectedAnswer !== "") {
            const is_correct = checkAnswer(selectedAnswer);
            const data = {
                type: localType,
                pk: currentTraining[currentRound].pk,
                is_correct: is_correct,
            };

            console.log(selectedAnswer, is_correct);
            dispatch(decrementTrainingInfo());
            dispatch(fetchTrainingPatch(data));

            checkRound(is_correct);
        } else {
            console.log("Пожалуйста, выберите ответ");
        }
    }

    function handleContinue() {
        nextRoundManually();
    }

    function checkAnswer(answerWord) {
        const cleanWord = answerWord.trim().toLowerCase();
        return currentTraining[currentRound].word.text.toLowerCase() === cleanWord;
    }

    return (
        <div className="d-flex justify-content-center my-4">
            <button
                type="button"
                className={`btn btn-primary save-btn py-2 w-50 ${selectedAnswer === null || selectedAnswer === "" || (hasAnswered && isCorrect) ? "disabled" : ""}`}
                onClick={hasAnswered && !isCorrect ? handleContinue : handleFinalAnswer}
                disabled={selectedAnswer === null || selectedAnswer === "" || (hasAnswered && isCorrect)}
            >
                <span>
                    <b>{hasAnswered && !isCorrect ? "Продолжить" : "Ответить"}</b>
                </span>
            </button>
        </div>
    );
}

export default AnswerButton;
