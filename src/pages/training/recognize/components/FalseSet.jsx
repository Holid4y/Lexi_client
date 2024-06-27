import React from "react";

function FalseSet({ word, index, selectedAnswer, setSelectedAnswer, isViewResult }) {
    // Функция для изменения выбранного ответа (переключение radio)
    function handleAnswerChange(answer) {
        setSelectedAnswer(answer);
    }

    let labelClass = "btn btn-dark-list w-100 mb-3 py-3";
    // if (hasAnswered) {
    //     if (word.text === correctAnswer) {
    //         labelClass += " box-success";
    //     } else if (selectedAnswer === word.text) {
    //         labelClass += " box-danger";
    //     }
    // }

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
            <label className={labelClass} htmlFor={`option_${index}`}>
                {word.translation}
            </label>
        </div>
    );
}

export default FalseSet;
