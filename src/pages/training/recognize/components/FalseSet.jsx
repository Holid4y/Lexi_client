import React, { useEffect, useState } from "react";

import RadioInput from "./RadioInput";
import Lable from "./Lable";

function FalseSet({ training, round, isViewResult, correctWord }) {
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

    return (
        <div>
            {falseSet &&
                falseSet.map((word, index) => (
                    <>
                        <RadioInput 
                            word={word} 
                            index={index} 
                            isViewResult={isViewResult} 

                        />

                        <Lable word={word} index={index} isViewResult={isViewResult} correctWord={correctWord} />
                    </>
                ))}
        </div>
    );
}

export default FalseSet;
