import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../../../../common/reducers/training/trainingRoundSlice";
import { cleanAnswer } from "../../common/utils";

function TextInput({ correctWord }) {
    const dispatch = useDispatch();
    const { round, isViewResult } = useSelector((state) => state.trainingRound);
    const [classState, setClassState] = useState("form-control py-2-5 mb-2");
    const [localAnswer, setLocalAnswer] = useState("");

    useEffect(() => {
        setLocalAnswer("");
        setClassState("form-control py-2-5 mb-2");
    }, [round]);

    useEffect(() => {
        if (isViewResult) {
            setClass();
        }
    }, [isViewResult]);

    function setClass() {
        const cleanWord = cleanAnswer(localAnswer);
        // Подсветить выбранный ответ красным, а правильный зеленым поверх красного
        if (correctWord === cleanWord) {
            setClassState("form-control py-2-5 mb-2 box-success-input");
        } else {
            setClassState("form-control py-2-5 mb-2 box-danger-input");
        }
    }

    const handleInputChange = (event) => {
        setLocalAnswer(event.target.value);
        dispatch(setAnswer(event.target.value));
    };

    const getCorrectWordStyled = () => {
        let result = [];
        const minLen = Math.min(localAnswer.length, correctWord.length);

        for (let i = 0; i < minLen; i++) {
            if (localAnswer[i] !== correctWord[i]) {
                result.push(
                    <span key={i} className="ans_green_text">
                        <u>{correctWord[i]}</u>
                    </span>
                );
            } else {
                result.push(
                    <span key={i}>
                        {correctWord[i]}
                    </span>
                );
            }
        }

        // Add remaining characters
        if (correctWord.length > localAnswer.length) {
            for (let i = localAnswer.length; i < correctWord.length; i++) {
                result.push(
                    <span key={i}>
                        {correctWord[i]}
                    </span>
                );
            }
        }

        return result;
    };

    const isCorrectAnswer = cleanAnswer(localAnswer) === correctWord;

    return (
        <div className="mb-4">
            <h3 className="text-center mb-3">Напишите ответ</h3>
            <input
                type="text"
                className={classState}
                value={localAnswer}
                onChange={handleInputChange}
            />
            {isViewResult && !isCorrectAnswer && (
                <div className="correct-text mt-2">
                    {getCorrectWordStyled()}
                </div>
            )}
        </div>
    );
}

export default TextInput;
