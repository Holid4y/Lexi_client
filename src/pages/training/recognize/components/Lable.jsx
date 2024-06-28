import React, { useEffect, useState } from "react";

function Lable({ word, index, selectedAnswer, isViewResult, correctWord }) {
    const [classState, setClassState] = useState("");
    const [localSelectedAnswer, setLocalSelectedAnswer] = useState(null);

    useEffect(() => {
        setClassState("btn btn-dark-list w-100 mb-3 py-3");
        if (isViewResult) {
            setClass();
        }
    }, [isViewResult]);

    useEffect(() => {
        setLocalSelectedAnswer(selectedAnswer);
    }, [selectedAnswer]);


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
        <label className={classState} htmlFor={`option_${index}`}>
            {word.translation}
        </label>
    );
}

export default Lable;
