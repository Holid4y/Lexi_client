import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../../../../common/reducers/training/trainingRoundSlice";
import { cleanAnswer } from "../../common/utils";
import { Reproduce } from "../../common/training";
import { Round } from "../../common/round";


interface TextInputProps {
    roundObj: Round;
    trainingObj: Reproduce;
}

const TextInput: React.FC<TextInputProps> = ({ roundObj, trainingObj }) => {

    const defaultClass = "form-control py-2-5 mb-2 text-center-input";
    const wrongClass = `${defaultClass} box-danger`;
    const correctClass = `${defaultClass} box-success`;

    const [classState, setClassState] = useState(defaultClass);
    const [localAnswer, setLocalAnswer] = useState("");
    const [correctWord, setCorrectWord] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);


    
    useEffect(() => {
        setCorrectWord(trainingObj.getCurrentRound().word.text)
        setLocalAnswer("")
        setClassState(defaultClass)
        setFocus()
    }, [roundObj.round]);

    // Отобаржаем результат
    useEffect(() => {
        if (roundObj.isViewResult) {
            setClass();
        }
    }, [roundObj.isViewResult]);

    function setFocus() {
        if (inputRef.current) { 
            // Устанавливаем фокус на input при смене раунда
            inputRef.current.focus(); 
        }
    }

    function setClass() {
        const cleanAnswerWord = cleanAnswer(localAnswer);
        // Подсветить выбранный ответ красным, а правильный зеленым поверх красного
        if (correctWord === cleanAnswerWord) {
            setClassState(correctClass);
        } else {
            setClassState(wrongClass);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value
        setLocalAnswer(answer);
        roundObj.setAnswer(answer)
    };

    const getCorrectWordStyled = (): React.ReactNode[] => {
        let result: React.ReactNode[] = []; 
    
        const maxLength = Math.max(localAnswer.length, correctWord.length);
        console.log(localAnswer, correctWord)
        for (let i = 0; i < maxLength; i++) {
            const correctLetter = correctWord[i];
            const localLetter = localAnswer[i];
    
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
                result.push(
                    <span key={i} className="ans_white_text">
                        {localAnswer[i]}
                    </span>
                );
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
            <input 
                type="text" className={classState} 
                value={localAnswer}
                placeholder="Напишите ответ"
                onChange={handleInputChange} 
                ref={inputRef} // Привязываем input к созданной ссылке
            />
            {roundObj.isViewResult && !isCorrectAnswer && <div className="correct-text mt-2">{getCorrectWordStyled()}</div>}
        </div>
    );
}

export default TextInput;
