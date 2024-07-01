import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setHintIsOpen } from "../../../../common/reducers/training/trainingRoundSlice";

function Hint({ text }) {
    const dispatch = useDispatch();
    const { hintIsOpen } = useSelector((state) => state.trainingRound);
    const [ hintText, setHintText ] = useState(null)


    function shuffleText(text) {
        return text
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    }

    useEffect(() => {
        dispatch(setHintIsOpen(false))
    }, [dispatch, text]);

    

    function handleClick() {
        setHintText(shuffleText(text))
        dispatch(setHintIsOpen(true))
        
    }

    return (
        <div className="mb-4">
            <button type="text" className={hintIsOpen ? "form-control py-2" : "form-control py-2 disabled placeholder"} onClick={() => handleClick()} disabled={hintIsOpen}>
                <h1>{hintText ? hintText : ''}</h1>
            </button>
            <small className="">Если затрудняетесь ответить, нажмите на блок с подсказкой</small>
        </div>
    );
}

export default Hint;
