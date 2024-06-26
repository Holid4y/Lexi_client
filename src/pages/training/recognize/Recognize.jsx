import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

    // выбранный ответ
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    // массив ложных ответов
    const [falseSet, setFalseSet] = useState(null);
    // проверки последнего слова
    const [isEnd, setIsEnd] = useState(false);

    // Используем эффект для отправки запроса на получение тренировки
    useEffect(() => {
        // Проверяем, что выполняются следующие условия:
        // 1. Массив training либо пустой, либо не существует (training является falsy значением)
        // 2. Переменная patchLoading имеет значение false (falsy значение)
        // Если все эти условия выполняются, то отправляем запроса на получение тренировки

        if (!training & !patchLoading) {
            dispatch(fetchTraining(localType));
        }

        if (!learning_words) {
            dispatch(fetchHome());
        }
    }, [dispatch, isEnd]);

    // Функция для создания массива ложных ответов
    function makeFalseSet(falseAnswers, correctAnswer) {
        const falseSet = [...falseAnswers];
        falseSet.push(correctAnswer);

        // Перемешиваем элементы массива с помощью алгоритма Фишера-Йетса
        for (let i = falseSet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [falseSet[i], falseSet[j]] = [falseSet[j], falseSet[i]];
        }
        return falseSet;
    }

    // Используем эффект для создания массива ложных ответов для каждого раунда
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

    function checkRound(is_correct) {
        if (is_correct) {
            // прибавляем балл за правельный ответ
            dispatch(addScore());
        }
        // после ответа, если это последный раунд
        if (round + 1 == training.length) {
            setIsEnd(true); // отображаем страницу окончания
            dispatch(clearTraining()); // очищаем текущий training
            dispatch(clearRound()); // сбрасывает до первого слова
        } else {
            dispatch(nextRound()); // следующий раунд
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
                                {falseSet &&
                                    falseSet.map((word, index) => (
                                        <FalseSet key={index} word={word} index={index} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
                                    ))}
                            </div>

                            <AnswerButton
                                localType={localType}
                                selectedAnswer={selectedAnswer}
                                currentTraining={training}
                                setSelectedAnswer={setSelectedAnswer}
                                currentRound={round}
                                checkRound={checkRound}
                                decrementTrainingInfo={decrementTrainingInfoRecognize}
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
                                            <span>Изученных и повторенных слов: <b className="btn btn-success">{learning_words}</b></span> <br />
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
