import React, { useEffect, useState } from "react";

import Lable from "./Lable";

import { Recognize, FalseSetItem } from "../../common/training";
import { Round } from "../../common/round";


interface FalseSetProps {
    roundObj: Round;
    trainingObj: Recognize;
}

// Компонент FalseSet отвечает за отображение вариантов ответа, включая правильный ответ
const FalseSet: React.FC<FalseSetProps> = ({ roundObj, trainingObj }) => {

    const [falseSetList, setFalseSetList] = useState<FalseSetItem[]>([]);


    useEffect(() => {
        setFalseSetList(trainingObj.getFalseSetList())
    }, [roundObj.round]);

    // Обработчик для нажатий клавиш 1-6
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key >= "1" && event.key <= "6") {
                const index = parseInt(event.key, 10) - 1;
                if (index < falseSetList.length) {
                    roundObj.setSelectedLable(index)
                    roundObj.setAnswer(falseSetList[index].text)
                    roundObj.handleFinalAnswer(trainingObj)
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [roundObj.round, falseSetList]);


    return (
        <div>
            {
                falseSetList.map((item, index) => (
                    <React.Fragment key={index}>

                        <Lable 
                            word={item} 
                            index={index} 
                            roundObj={roundObj}
                            trainingObj={trainingObj}
                        />
                        
                    </React.Fragment>
                ))
            }
        </div>
    );
}

export default FalseSet;
