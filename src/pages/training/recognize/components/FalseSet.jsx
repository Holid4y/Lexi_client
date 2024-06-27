import React, {useEffect, useState} from "react";

function FalseSet({ word, index, selectedAnswer, setSelectedAnswer, isViewResult, correctWord }) {
    const [classState, setClassState] = useState("")
    const [localSelectedAnswer, setLocalSelectedAnswer] = useState(null)
    
    useEffect(() => {
        setClassState('btn btn-dark-list w-100 mb-3 py-3')
        if (isViewResult) {   
            setClass()
            
        }
    }, [isViewResult]);

    useEffect(() => {
        setLocalSelectedAnswer(selectedAnswer)
    }, [selectedAnswer]);

    // Функция для изменения выбранного ответа (переключение radio)
    function handleAnswerChange(answer) {
        setSelectedAnswer(answer);
    }

    function setClass() {
            // подсветить выбранный ответ красным, а правельный зеленым по верх красного
            
            if (word.text === localSelectedAnswer) {
                
                setClassState(`${classState} box-danger`);
            }
            if (word.text === correctWord) {
                setClassState(`${classState} box-success`);
            } 
        
    }
    
    return (
        <div>
            <input
                type="radio"
                className="btn-check "
                name="options"
                id={`option_${index}`}
                checked={selectedAnswer === word.text}
                onChange={() => handleAnswerChange(word.text)}
                disabled={isViewResult}
            />
            <label className={classState} htmlFor={`option_${index}`}>
                {word.translation}
            </label>
        </div>
    );
}

export default FalseSet;
