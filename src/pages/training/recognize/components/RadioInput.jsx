import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAnswer } from "../../../../common/reducers/training/trainingRoundSlice";


function RadioInput({ word, index }) {
    const dispatch = useDispatch();
    const { answer, isViewResult } = useSelector((state) => state.trainingRound);

    return (
        <input
            type="radio"
            className="btn-check "
            name="options"
            id={`option_${index}`}
            checked={answer === word.text}
            onChange={() => dispatch(setAnswer(word.text))}
            disabled={isViewResult}
        />
    );
}

export default RadioInput;
