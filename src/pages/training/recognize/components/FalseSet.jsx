import React, { useEffect, useState } from "react";

import RadioInput from "./RadioInput";
import Lable from "./Lable";

function FalseSet({ training, round, correctWord }) {
    // массив ложных ответов
    const [falseSet, setFalseSet] = useState(null);

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
            if (event.key >= '1' && event.key <= '6') {
                const index = parseInt(event.key, 10) - 1;
                if (index < falseSet.length) {
                    // Проверяем существование элемента перед вызовом click()
                    const radioElement = document.getElementById(`option_${index}`);
                    if (radioElement) {
                        console.warn(`option_${index} выбран`);
                        radioElement.click();
                    } else {
                        console.warn(`option_${index} не найдено`);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [falseSet]);

    return (
        <div>
            {falseSet &&
                falseSet.map((word, index) => (
                    <>
                        <RadioInput word={word} index={index} />

                        <Lable word={word} index={index} correctWord={correctWord} />
                    </>
                ))}
        </div>
    );
}

export default FalseSet;
