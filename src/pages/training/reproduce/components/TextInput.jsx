import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../../../../common/reducers/training/trainingRoundSlice";

function TextInput() {
    const dispatch = useDispatch();
    const { round } = useSelector((state) => state.trainingRound);
    const [localAnswer, setLocalAnswer] = useState("");

    useEffect(() => {
        setLocalAnswer("");
    }, [round]);

    const handleInputChange = (event) => {
        setLocalAnswer(event.target.value);
        dispatch(setAnswer(event.target.value));
    };

    return (
        <div className="mb-4">
            <h3 className="text-center mb-3">Напишите ответ</h3>
            <input type="text" className="form-control py-2-5 mb-2" value={localAnswer} onChange={handleInputChange} />
        </div>
    );
}

export default TextInput;
