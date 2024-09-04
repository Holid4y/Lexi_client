import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedLable, setAnswer } from "../../../../common/reducers/training/trainingRoundSlice";

import Lable from "./Lable";

import { Answer } from "../../common/answer";
import { Recognize, FalseSetItem } from "../../common/training";
import { RootState } from "../../../../store";


interface FalseSetProps {
    trainingObj: Recognize;
}

// Компонент FalseSet отвечает за отображение вариантов ответа, включая правильный ответ
const FalseSet: React.FC<FalseSetProps> = ({ trainingObj }) => {
    const dispatch = useDispatch();
    const { round } = useSelector((state: RootState) => state.trainingRound);

    const answerObj = new Answer(dispatch, round, trainingObj)


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
                    dispatch(setSelectedLable(index))
                    answerObj.handleFinalAnswer(falseSetList[index].text)
                    setHasSelected(true); 
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
                        answerObj={answerObj}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}

export default FalseSet;