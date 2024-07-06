import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHintIsOpen } from "../../../../common/reducers/training/trainingRoundSlice";

function Hint({ text }) {
    const dispatch = useDispatch();
    const { hintIsOpen } = useSelector((state) => state.trainingRound);
    const [hintText, setHintText] = useState(null);
    const [showSmallText, setShowSmallText] = useState(true);

    function shuffleText(text) {
        return text.split("").sort(() => Math.random() - 0.5).join("");
    }

    useEffect(() => {
        dispatch(setHintIsOpen(false));
    }, [dispatch, text]);

    function handleClick() {
        setHintText(shuffleText(text));
        dispatch(setHintIsOpen(true));
        setShowSmallText(false);
    }

    return (
        <div className="mb-4">
            <button type="text" className={hintIsOpen ? "form-control p-0 py-2 position-relative h-65" : "form-control p-0 py-2 disabled placeholder position-relative h-65"}
                onClick={() => handleClick()} disabled={hintIsOpen} >
                <h1 className="p-0 m-0">{hintText ? hintText : ''}</h1>
                {showSmallText && (
                    <small className="small-text-hint top-50 start-50 translate-middle w-100 text-center ps-3">
                        Нажмите, если затрудняетесь ответить
                    </small>
                )}
            </button>
        </div>
    );
}

export default Hint;
