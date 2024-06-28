import React, { useEffect, useState } from "react";

function RadioInput({ word, index, selectedAnswer, isViewResult, setSelectedAnswer  }) {


    

    return (
        <input
            type="radio"
            className="btn-check "
            name="options"
            id={`option_${index}`}
            checked={selectedAnswer === word.text}
            onChange={() => setSelectedAnswer(word.text)}
            disabled={isViewResult}
        />
    );
}

export default RadioInput;
