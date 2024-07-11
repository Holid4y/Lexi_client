import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RadioInput from "./RadioInput";
import Lable from "./Lable";
import { setAnswer } from "../../../../common/reducers/training/trainingRoundSlice";
import { handleFinalAnswer } from "../../common/utils";

// Компонент FalseSet отвечает за отображение вариантов ответа, включая правильный ответ
function FalseSet({ training, round, correctWord }) {
    const dispatch = useDispatch();
    
    const [falseSet, setFalseSet] = useState(null);
    const [selectedRadioIndex, setSelectedRadioIndex] = useState(null);
    const { answer } = useSelector((state) => state.trainingRound);

    // Функция для создания массива ложных ответов
    function makeFalseSet(falseAnswers, correctAnswer) {
        const falseSet = [...falseAnswers];
        falseSet.push(correctAnswer);

        // Перемешиваем элементы массива с помощью алгоритма Фишера-Йетса
        for (let i = falseSet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [falseSet[i], falseSet[j]] = [falseSet[j], falseSet[i]];
        }
        return falseSet;
    }

    // Используем эффект для создания массива ложных ответов для каждого раунда
    useEffect(() => {
        if (training) {
            if (training[round].false_set) {
                const falseAnswers = training[round].false_set;
                const correctAnswer = {
                    text: training[round].word.text,
                    translation: training[round].word.translation,
                };
                setFalseSet(makeFalseSet(falseAnswers, correctAnswer));
            }
        }
    }, [round, training]);

    // Обработчик для нажатий клавиш 1-6
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key >= "1" && event.key <= "6") {
                const index = parseInt(event.key, 10) - 1;
                if (index < falseSet.length) {
                    // Проверяем существование элемента перед вызовом click()
                    const radioElement = document.getElementById(`option_${index}`);
                    if (radioElement) {
                        radioElement.click();
                        setSelectedRadioIndex(index);
                    } else {
                        console.warn(`option_${index} не найдено`);
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [falseSet]);

    useEffect(() => {
        handleFinalAnswer(answer, "recognize", training, round, dispatch);
    }, [answer]);

    return (
        <div>
            {falseSet &&
                falseSet.map((word, index) => (
                    <React.Fragment key={index}>
                        <RadioInput word={word} index={index} />
                        <Lable word={word} index={index} correctWord={correctWord} selectedRadioIndex={selectedRadioIndex} />
                    </React.Fragment>
                ))}
        </div>
    );
}

export default FalseSet;
