import React, { useEffect, useState } from "react";

import Lable from "./Lable";

import { Recognize, FalseSetItem } from "../../common/training";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";

interface FalseSetProps {
    trainingObj: Recognize;
}

// Компонент FalseSet отвечает за отображение вариантов ответа, включая правильный ответ
const FalseSet: React.FC<FalseSetProps> = ({ trainingObj }) => {
    const { round, isViewResult } = useSelector((state: RootState) => state.trainingRound);


    const [falseSetList, setFalseSetList] = useState<FalseSetItem[]>([]);
    const [hasSelected, setHasSelected] = useState(false); // Состояние для отслеживания выбора

    useEffect(() => {
        setFalseSetList(trainingObj.getFalseSetList());
        setHasSelected(false); // Сбрасываем выбор при новом раунде
    }, [round]);

    // Обработчик для нажатий клавиш 1-6
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key >= "1" && event.key <= "6" && !hasSelected) { // Проверяем hasSelected
                const index = parseInt(event.key, 10) - 1;
                if (index < falseSetList.length) {
                    console.log(isViewResult);
                    console.log('sent answer')
                    // roundObj.setSelectedLable(index);
                    // roundObj.setAnswer(falseSetList[index].text);
                    // roundObj.handleFinalAnswer(trainingObj);
                    setHasSelected(true); // Устанавливаем hasSelected в true после выбора
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [round, falseSetList, hasSelected]); // Добавляем hasSelected в зависимости

    return (
        <div>
            {falseSetList.map((item, index) => (
                <React.Fragment key={index}>
                    <Lable 
                        word={item} 
                        index={index} 
                        trainingObj={trainingObj}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}

export default FalseSet;