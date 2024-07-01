import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTrainingPatch, decrementTrainingInfo } from "../../../common/reducers/training/trainingSlice";

import { setAnswer, nextRound, addScore, setIsViewResult, setIsEnd, setIsCorrect } from "../../../common/reducers/training/trainingRoundSlice";

import { cleanAnswer } from "../common/utils";

import { handleFinalAnswer } from "../common/utils";

function AnswerButton({ localType }) {
    const dispatch = useDispatch();
    const { answer, training, round, isCorrect } = useSelector((state) => state.trainingRound);

    function performRoundSwitch() {
        if (round + 1 === training.length) {
            dispatch(setIsEnd(true)); // отображаем страницу окончания
        } else {
            dispatch(nextRound()); // отображает следующий раунд
        }
        dispatch(setIsViewResult(false));
    }

    const AnswerButton = (
        <button
            type="text"
            className={`btn btn-primary save-btn py-2 w-50 ${(answer === null) | (answer === "") ? "disabled" : ""}`}
            onClick={() => handleFinalAnswer(answer, localType, training, round, dispatch, performRoundSwitch)}
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
                dispatch(setIsCorrect(null));
            }}
        >
            <span>
                <b>Продолжить</b>
            </span>
        </button>
    );
    return <div className="d-flex justify-content-center my-4">{isCorrect == false ? NextButton : ""}</div>;
}

export default AnswerButton;
