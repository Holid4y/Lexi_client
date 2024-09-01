import React, { useEffect, useRef } from "react";

import { Round } from "../common/round";
import { Recognize, Reproduce } from "../common/training";


interface AnswerButtonProps {
    roundObj: Round;
    trainingObj: Recognize | Reproduce;
}


const AnswerButton: React.FC<AnswerButtonProps> = ({ roundObj, trainingObj }) => {

    const nextButtonRef = useRef<HTMLButtonElement | null>(null);
    const answerButtonRef = useRef<HTMLButtonElement | null>(null);

    // Ответ при нажатии на Enter
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
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
            type="button"
            className={`btn btn-primary position-relative save-btn py-2 w-50 ${(roundObj.answer === null) || (roundObj.answer === "") ? "disabled" : ""}`}
            onClick={() => roundObj.handleFinalAnswer(trainingObj)}
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
            type="button"
            className={`btn btn-primary position-relative save-btn py-2 w-50`}
            onClick={() => roundObj.performRoundSwitch()}
        >
            <span>
                <b>Продолжить</b>
            </span>
            <kbd className="press_button d-none d-sm-block">Enter</kbd>
        </button>
    );

    const getButtonComponent = () => {
        if (trainingObj instanceof Recognize) {
            return roundObj.isCorrect === false ? NextButton : "";
        } else if (trainingObj instanceof Reproduce) {
            if (roundObj.isCorrect === null) {
                return AnswerButton;
            } else if (roundObj.isCorrect === false) {
                return NextButton;
            } else {
                return // не отображаем кнопу, так как ответ правильный
            }
        }
    };

    return (
        <div className="d-flex justify-content-center my-4">
            {getButtonComponent()}
        </div>
    );
}

export default AnswerButton;
