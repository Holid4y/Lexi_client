import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getTrainig, getLeargingWord } from "../common/utils";

import { nextRound, setIsEnd, throwOneRoundState } from "../../../common/reducers/training/trainingRoundSlice";

import Header from "../components/Header";
import WordCard from "../components/WordCard";
import FalseSet from "./components/FalseSet";
import End from "../components/End";
import AnswerButton from "../components/AnswerButton";

function Recognize() {
    const dispatch = useDispatch();
    const { count_word_to_training_recognize, loading, patchLoading, error } = useSelector((state) => state.training);
    const { training, round, score, isEnd } = useSelector((state) => state.trainingRound);
    const { learning_words } = useSelector((state) => state.home);

    const localType = "recognize";


    function performRoundSwitch() {
        if (round + 1 === training.length) {
            dispatch(setIsEnd(true)); // отображаем страницу окончания
        } else {
            dispatch(nextRound()); // отображает следующий раунд
        }
        dispatch(throwOneRoundState()) // просле переключения раунда, очищаем state
    }

    // Используем эффект для отправки запроса на получение тренировки
    useEffect(() => {
        getTrainig(dispatch, isEnd, patchLoading, localType);
        getLeargingWord(dispatch, learning_words);
    }, [dispatch]);

    return (
        <div className="align-items-center">
            {loading ? (
                <p>Loading...</p>
            ) : (
                (isEnd && <End type={localType} count_word_to_training={count_word_to_training_recognize} score={score} />) ||
                (training && (
                    <>
                        <Header />
                        <main className="container px-4">
                            <WordCard localType={localType}/>
                            <div className="mb-4">
                                <h3 className="text-center mb-3">Варианты ответа</h3>
                                <FalseSet
                                    training={training}
                                    round={round}
                                    correctWord={training[round].word.text}
                                    performRoundSwitch={performRoundSwitch} 
                                />
                            </div>

                            <AnswerButton
                                localType={localType}
                            />
                        </main>
                    </>
                )) ||
                (error && <p>Error: {error}</p>) ||
                (!training & (learning_words != 0) && (
                    <div className="align-items-center">
                        <div className="container sticky-top mb-3 pt-2">
                            <nav className="navbar dark-nav">
                                <div className="container-fluid">
                                    <span className="navbar-brand">Тестирование</span>
                                </div>
                            </nav>
                        </div>
                        <div className="container">
                            <div className="text-center mt-5">
                                <div className="px-4 pt-5 mt-5 text-center">
                                    <h1 className="fw-bold mt-3 text-body-emphasis">Все слова повторены 🥰</h1>
                                    <div className="col-lg-8 mx-auto">
                                        <p className="lead mb-4">
                                            <span>
                                                Изученных и повторенных слов: <b className="btn btn-success">{learning_words}</b>
                                            </span>{" "}
                                            <br />
                                            <span>Читайте больше и добавляйте новые слова</span>
                                        </p>
                                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                                            <Link to="/books" className="btn btn-primary px-4">
                                                Выбрать из списка
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) || <p>У вас нет слов для повторения, их надо добавить</p>
            )}
        </div>
    );
}

export default Recognize;
