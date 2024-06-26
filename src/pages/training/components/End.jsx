import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

function End({ type, count_word_to_training, setIsEnd, score, clearScore }) {
    const dispatch = useDispatch();
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
                    <button>Следующий раунд</button>
                    <small>Осталось {count_word_to_training} слов</small>
                </Link>
            )}
            
            <Link to="/training" onClick={() => handleAction()}>
                <button>Выйти</button>
            </Link>
        </>
    );
}

export default End;
