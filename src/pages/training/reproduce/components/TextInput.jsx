import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../../../../common/reducers/training/trainingRoundSlice";
import { cleanAnswer } from "../../common/utils";

function TextInput({ correctWord }) {
    const dispatch = useDispatch();
    const { round, isViewResult } = useSelector((state) => state.trainingRound);
    const [classState, setClassState] = useState("form-control py-2-5 mb-2");
    const [localAnswer, setLocalAnswer] = useState("");
    const inputRef = useRef(null); // Создаем ссылку на input

    useEffect(() => {
        setLocalAnswer("");
        setClassState("form-control py-2-5 mb-2");
        inputRef.current.focus(); // Устанавливаем фокус на input при смене раунда
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
            setClassState("form-control py-2-5 mb-2 box-success");
        } else {
            setClassState("form-control py-2-5 mb-2 box-danger");
        }
    }

    const handleInputChange = (event) => {
        setLocalAnswer(event.target.value);
        dispatch(setAnswer(event.target.value));
    };

    const getCorrectWordStyled = () => {
        let result = [];

        const maxLength = Math.max(localAnswer.length, correctWord.length);

        for (let i = 0; i < maxLength; i++) {
            const correctLetter = correctWord[i]
            const localLetter = localAnswer[i]
            if (!correctLetter) {
                
                result.push(
                    <span key={i} className="ans_red_text">
                        {localAnswer[i]}
                    </span>
                );
                continue; // Переход к следующей итерации
            }
            if (!localLetter) {
                
                result.push(
                    <span key={i} className="ans_red_text">
                        _
                    </span>
                );
                continue; // Переход к следующей итерации
            }
            if (localLetter.toLowerCase() === correctLetter.toLowerCase()) {
                result.push(<span key={i}>{localAnswer[i]}</span>);
            } else {
                result.push(
                    <span key={i} className="ans_red_text">
                        {localAnswer[i]}
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
                type="text" className={classState} 
                value={localAnswer} 
                onChange={handleInputChange} 
                ref={inputRef} // Привязываем input к созданной ссылке
            />
            {isViewResult && !isCorrectAnswer && <div className="correct-text mt-2">{getCorrectWordStyled()}</div>}
        </div>
    );
}

export default TextInput;
