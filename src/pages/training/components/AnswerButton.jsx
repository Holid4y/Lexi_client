import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { setIsCorrect } from "../../../common/reducers/training/trainingRoundSlice";


import { handleFinalAnswer, performRoundSwitch } from "../common/utils";

function AnswerButton({ localType }) {
    const dispatch = useDispatch();
    const { answer, training, round, isCorrect } = useSelector((state) => state.trainingRound);


    const AnswerButton = (
        <button
            type="text"
            className={`btn btn-primary save-btn py-2 w-50 ${(answer === null) | (answer === "") ? "disabled" : ""}`}
            onClick={() => handleFinalAnswer(answer, localType, training, round, dispatch)}
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
                performRoundSwitch(dispatch, round, training);
                dispatch(setIsCorrect(null));
            }}
        >
            <span>
                <b>Продолжить</b>
            </span>
        </button>
    );
    return <div className="d-flex justify-content-center my-4">
        {localType === "recognize" ? (isCorrect == false ? NextButton : "") 
        : 
        (isCorrect == null ? AnswerButton : isCorrect == false ? NextButton : '')}
        
        </div>;
}

export default AnswerButton;
