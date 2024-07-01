import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAnswer } from "../../../../common/reducers/training/trainingRoundSlice";

import { cleanAnswer } from "../../common/utils";

function TextInput({ correctWord }) {
    const dispatch = useDispatch();
    const { round, isViewResult } = useSelector((state) => state.trainingRound);
    const [classState, setClassState] = useState("");
    const [localAnswer, setLocalAnswer] = useState("");

    useEffect(() => {
        setLocalAnswer("");
    }, [round]);

    useEffect(() => {
        setClassState("form-control py-2-5 mb-2");
        
        if (isViewResult) {
            
            setClass();
        }
    }, [isViewResult]);

    function setClass() {
        const cleanWord = cleanAnswer(localAnswer)
        // подсветить выбранный ответ красным, а правельный зеленым по верх красного
        if (correctWord === cleanWord) {
            setClassState(`${classState} box-success-input`);
        } else {
            setClassState(`${classState} box-danger-input`)
        }
    }

    const handleInputChange = (event) => {
        setLocalAnswer(event.target.value);
        dispatch(setAnswer(event.target.value));
    };

    return (
        <div className="mb-4">
            <h3 className="text-center mb-3">Напишите ответ</h3>
            <input type="text" className={classState} value={localAnswer} onChange={handleInputChange} />
        </div>
    );
}

export default TextInput;
