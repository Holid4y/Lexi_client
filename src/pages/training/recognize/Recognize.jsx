import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { decrementTrainingInfoRecognize, fetchTraining } from "../../../common/reducers/training/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";

import { addScore, nextRound, clearTraining, clearRound, clearScore } from "../../../common/reducers/training/recognizeSlice";

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

    const [selectedAnswer, setSelectedAnswer] = useState(() => {
        return localStorage.getItem("selectedAnswer") || null;
    });
    const [falseSet, setFalseSet] = useState(null);
    const [isEnd, setIsEnd] = useState(false);
    const [isCorrect, setIsCorrect] = useState(() => {
        const saved = localStorage.getItem("isCorrect");
        return saved === "true" ? true : saved === "false" ? false : null;
    });
    const [hasAnswered, setHasAnswered] = useState(() => {
        return localStorage.getItem("hasAnswered") === "true" || false;
    });

    useEffect(() => {
        if (!training && !patchLoading) {
            dispatch(fetchTraining(localType));
        }

        if (!learning_words) {
            dispatch(fetchHome());
        }
    }, [dispatch, isEnd]);

    useEffect(() => {
        if (training) {
            if (training[round].false_set) {
                const falseAnswers = training[round].false_set;
                const correctAnswer = {
                    text: training[round].word.text,
                    translation: training[round].word.translation,
                };
                setFalseSet(makeFalseSet(falseAnswers, correctAnswer));
            }
        }
    }, [round, training]);

    useEffect(() => {
        localStorage.setItem("selectedAnswer", selectedAnswer);
        localStorage.setItem("isCorrect", isCorrect);
        localStorage.setItem("hasAnswered", hasAnswered);
    }, [selectedAnswer, isCorrect, hasAnswered]);

    function makeFalseSet(falseAnswers, correctAnswer) {
        const falseSet = [...falseAnswers];
        falseSet.push(correctAnswer);

        for (let i = falseSet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [falseSet[i], falseSet[j]] = [falseSet[j], falseSet[i]];
        }
        return falseSet;
    }

    function checkRound(is_correct) {
        setIsCorrect(is_correct);
        setHasAnswered(true);

        if (is_correct) {
            dispatch(addScore());
            setTimeout(() => {
                if (round + 1 === training.length) {
                    setIsEnd(true);
                    dispatch(clearTraining());
                    dispatch(clearRound());
                } else {
                    dispatch(nextRound());
                }
                setIsCorrect(null);
                setSelectedAnswer(null);
                setHasAnswered(false);
                localStorage.removeItem("selectedAnswer");
                localStorage.removeItem("isCorrect");
                localStorage.removeItem("hasAnswered");
            }, 2000);
        } else {
            const correctWordIndex = falseSet.findIndex((word) => word.text === training[round].word.text);
            setFalseSet((prevFalseSet) =>
                prevFalseSet.map((word, index) => {
                    if (word.text === selectedAnswer) {
                        return { ...word, className: "box-danger" };
                    } else if (index === correctWordIndex) {
                        return { ...word, className: "box-success" };
                    } else {
                        return word;
                    }
                })
            );
        }
    }

    function nextRoundManually() {
        if (round + 1 === training.length) {
            setIsEnd(true);
            dispatch(clearTraining());
            dispatch(clearRound());
        } else {
            dispatch(nextRound());
        }
        setIsCorrect(null);
        setSelectedAnswer(null);
        setHasAnswered(false);
        localStorage.removeItem("selectedAnswer");
        localStorage.removeItem("isCorrect");
        localStorage.removeItem("hasAnswered");
    }

    const EndingPage = <End type={localType} count_word_to_training={count_word_to_training_recognize} setIsEnd={setIsEnd} score={score} clearScore={clearScore} />;
    const loadingView = <p>Loading...</p>;
    const RoundPage = training && (
        <div>
            <Header round={round} trainingLength={training.length} />
            <main className="container px-4">
                <WordCard text={training[round].word.text} lvl={training[round].recognize_lvl} />
                <div className="mb-4">
                    <h3 className="text-center mb-3">Варианты ответа</h3>
                    {falseSet &&
                        falseSet.map((word, index) => (
                            <FalseSet
                                key={index}
                                word={word}
                                index={index}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                                isCorrect={isCorrect}
                                hasAnswered={hasAnswered}
                                correctAnswer={training[round].word.text}
                            />
                        ))}
                </div>

                <AnswerButton
                    localType={localType}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    currentTraining={training}
                    currentRound={round}
                    checkRound={checkRound}
                    decrementTrainingInfo={decrementTrainingInfoRecognize}
                    isCorrect={isCorrect}
                    hasAnswered={hasAnswered}
                    nextRoundManually={nextRoundManually}
                />
            </main>
        </div>
    );

    const ErrorPage = <p>Error: {error}</p>;
    const NoMoreWords = !training && learning_words !== 0 && (
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
    );

    const NoWords = <p>У вас нет слов для повторения, их надо добавить</p>;

    return <div className="align-items-center">{loading ? loadingView : (isEnd && EndingPage) || RoundPage || (error && ErrorPage) || NoMoreWords || NoWords}</div>;
}

export default Recognize;
