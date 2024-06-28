import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decrementTrainingInfoRecognize } from "../../../common/reducers/training/trainingSlice";

import { addScore, nextRound, clearScore } from "../../../common/reducers/training/recognizeSlice";

import { getTrainig, getTLeargingWord } from "../common/utils";

import Header from "../components/Header";
import WordCard from "../components/WordCard";
import FalseSet from "./components/FalseSet";
import End from "../components/End";
import AnswerButton from "../components/AnswerButton";

function Recognize() {
    const dispatch = useDispatch();
    const { count_word_to_training_recognize, loading, patchLoading, error } = useSelector((state) => state.training);
    const { recognize, round, score } = useSelector((state) => state.recognize);
    const { learning_words } = useSelector((state) => state.home);

    const localType = "recognize";
    const training = recognize;

    // выбранный ответ
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // проверки последнего слова
    const [isEnd, setIsEnd] = useState(false);

    const [isViewResult, setIsViewResult] = useState(false);

    // Используем эффект для отправки запроса на получение тренировки
    useEffect(() => {
        getTrainig(dispatch, isEnd, patchLoading, localType)
        getTLeargingWord(dispatch, learning_words)
    }, [dispatch, isEnd]);

    function performRoundSwitch() {
        if (round + 1 === training.length) {
            setIsEnd(true); // отображаем страницу окончания
        } else {
            dispatch(nextRound()); // отображает следующий раунд
        }
        setIsViewResult(false);
    }

    function checkRound(is_correct) {
        if (is_correct) {
            // прибавляем балл за правельный ответ
            dispatch(addScore());
            setIsViewResult(true);
            // Это позволяет добавить задержку перед переключением на следующий раунд
            const correctTime = 1000;
            const wrongTime = 0;

            const timeCallDown = is_correct ? correctTime : wrongTime;

            setTimeout(performRoundSwitch, timeCallDown);
        } else {
            setIsViewResult(true);
        }
    }

    return (
        <div className="align-items-center">
            {loading ? (
                <p>Loading...</p>
            ) : (
                (isEnd && <End type={localType} count_word_to_training={count_word_to_training_recognize} setIsEnd={setIsEnd} score={score} clearScore={clearScore} />) ||
                (training && (
                    <>
                        <Header round={round} trainingLength={training.length} />
                        <main className="container px-4">
                            <WordCard text={training && training[round].word.text} lvl={training && training[round].recognize_lvl} />
                            <div className="mb-4">
                                <h3 className="text-center mb-3">Варианты ответа</h3>
                                <FalseSet
                                    training={training}
                                    round={round}
                                    selectedAnswer={selectedAnswer}
                                    setSelectedAnswer={setSelectedAnswer}
                                    isViewResult={isViewResult}
                                    correctWord={training[round].word.text}
                                />
                            </div>

                            <AnswerButton
                                localType={localType}
                                selectedAnswer={selectedAnswer}
                                currentTraining={training}
                                setSelectedAnswer={setSelectedAnswer}
                                currentRound={round}
                                checkRound={checkRound}
                                decrementTrainingInfo={decrementTrainingInfoRecognize}
                                performRoundSwitch={performRoundSwitch}
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
