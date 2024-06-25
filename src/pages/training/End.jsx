import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearScore } from "../../common/reducers/trainingSlice";

function End({ type, count_word_to_training, setIsEnd }) {
    const dispatch = useDispatch();
    const { score } = useSelector((state) => state.training);
    const [scoreState, setScoreState] = useState(0)


    useEffect(() => {
        // устанавливаем стэйт компонента
        // и после этого очищаем счет
        // так как на след. раундах он нужен чистый
        setScoreState(score)
        dispatch(clearScore())
    }, [dispatch]);

    function handleAction() {
        // переключить isEnd на false
        setIsEnd(false)
        
    }
    return (
        <>
            <p>Результат: {scoreState} правильных ответов </p>
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
