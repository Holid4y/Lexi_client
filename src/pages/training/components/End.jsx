import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { throwState, clearScore, setIsEnd } from "../../../common/reducers/training/trainingRoundSlice";



function End({ type, count_word_to_training, score }) {
    const dispatch = useDispatch();
    


    useEffect(() => {
        dispatch(throwState()); // очищаем текущий state
    }, [dispatch]);

    function handleAction() {
        dispatch(clearScore())
        // переключить isEnd на false
        dispatch(setIsEnd(false))
        
    }
    return (
        <>
            <p>Результат: {score} правильных ответов </p>
            {(count_word_to_training != 0 & count_word_to_training != null) && (
                <Link to={`/training/${type}`}>
                    <button onClick={handleAction}>Следующий раунд</button>
                    <small>Осталось {count_word_to_training} слов</small>
                </Link>
            )}
            
            <Link to="/training" onClick={() => handleAction()}>
                <button onClick={handleAction}>Выйти</button>
            </Link>
        </>
    );
}

export default End;
