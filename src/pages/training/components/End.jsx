import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchTrainingInfo } from "../../../common/reducers/training/trainingSlice";

import { throwState, clearScore, setIsEnd } from "../../../common/reducers/training/trainingRoundSlice";

function End({ type, count_word_to_training, score }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrainingInfo())
        dispatch(throwState()); // очищаем текущий state
    }, [dispatch]);

    function handleAction() {
        dispatch(clearScore());
        // переключить isEnd на false
        dispatch(setIsEnd(false));
    }
    return (
        <div className="align-items-center">
            <div className="container mb-4">
                <div className="text-center mt-5">
                    <div className="px-4 pt-5 mt-5 text-center">
                        <h1 className="fw-bold mt-3 text-body-emphasis">
                            Результат <br /> <b>{score}</b> правильных ответов 🧐
                        </h1>
                        <div className="col-lg-8 mx-auto">
                            <p className="lead mb-4">Вы можете продолжить прохождение тестов или же выйти</p>
                            <p className="lead mb-4">
                                Осталось <b>{count_word_to_training}</b> слова на повторение
                            </p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                                {(count_word_to_training != 0) & (count_word_to_training != null) ? (
                                    <Link to={`/training/${type}`}>
                                        <button className="btn btn-primary px-4 w-100" onClick={handleAction}>
                                            Следующий раунд
                                        </button>
                                    </Link>
                                ) : null}
                                <Link to="/training" onClick={() => handleAction()}>
                                    <button className="btn btn-secondary px-4 w-100" onClick={handleAction}>
                                        Выйти
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default End;
