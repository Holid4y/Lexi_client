import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearScore } from "../../common/reducers/trainingSlice";

function End({ type, count_word_to_training, setIsEnd }) {
    const dispatch = useDispatch();
    const { score } = useSelector((state) => state.training);
    function handleAction() {
        // переключить isEnd на false
        setIsEnd(false)
        dispatch(clearScore())
    }
    return (
        <>
            <p>Результат: {score} правильных ответов </p>
            {(count_word_to_training != 0 & count_word_to_training != null) && (
                <Link to={`/training/${type}`} onClick={() => handleAction()}>
                    <button>Следующий раунд ({count_word_to_training})</button>
                </Link>
            )}
            
            <Link to="/training" onClick={() => handleAction()}>
                <button>Выйти</button>
            </Link>
        </>
    );
}

export default End;
