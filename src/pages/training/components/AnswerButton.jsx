import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCorrect } from "../../../common/reducers/training/trainingRoundSlice";
import { handleFinalAnswer, performRoundSwitch } from "../common/utils";

function AnswerButton({ localType }) {
    const dispatch = useDispatch();
    const { answer, training, round, isCorrect } = useSelector((state) => state.trainingRound);
    const answerButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    // Ответ при нажатии на Enter
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                if (nextButtonRef.current && !nextButtonRef.current.disabled) {
                    nextButtonRef.current.click();
                } else if (answerButtonRef.current && !answerButtonRef.current.disabled) {
                    answerButtonRef.current.click();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    const AnswerButton = (
        <button
            ref={answerButtonRef}
            type="text"
            className={`btn btn-primary position-relative save-btn py-2 w-50 ${(answer === null) | (answer === "") ? "disabled" : ""}`}
            onClick={() => handleFinalAnswer(answer, localType, training, round, dispatch)}
        >
            <span>
                <b>Ответить</b>
            </span>
            <kbd className="press_button d-none d-sm-block">Enter</kbd>
        </button>
    );

    const NextButton = (
        <button
            ref={nextButtonRef}
            type="text"
            className={`btn btn-primary position-relative save-btn py-2 w-50`}
            onClick={() => {
                performRoundSwitch(dispatch, round, training);
                dispatch(setIsCorrect(null));
            }}
        >
            <span>
                <b>Продолжить</b>
            </span>
            <kbd className="press_button d-none d-sm-block">Enter</kbd>
        </button>
    );
    return (
        <div className="d-flex justify-content-center my-4">
            {localType === "recognize" ? (isCorrect == false ? NextButton : "") : isCorrect == null ? AnswerButton : isCorrect == false ? NextButton : ""}
        </div>
    );
}

export default AnswerButton;
