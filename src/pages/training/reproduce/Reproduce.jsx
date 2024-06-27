import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { decrementTrainingInfoReproduce, fetchTraining } from "../../../common/reducers/training/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";
import { Link } from "react-router-dom";

import { addScore, nextRound, clearTraining, clearRound, clearScore } from "../../../common/reducers/training/reproduceSlice";

import Header from "../components/Header";
import WordCard from "../components/WordCard";
import End from "../components/End";
import Hint from "./components/Hint";
import AnswerButton from "../components/AnswerButton";

function Reproduce() {
    const dispatch = useDispatch();

    const { count_word_to_training_reproduce, loading, patchLoading, error } = useSelector((state) => state.training);
    const { reproduce, round, score } = useSelector((state) => state.reproduce);
    const { learning_words } = useSelector((state) => state.home);

    // выбранный ответ
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Создаем состояние для проверки последнего слова
    const [isEnd, setIsEnd] = useState(false);
    const localType = "reproduce";
    const training = reproduce;

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

    const handleInputChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

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

    const EndingPage = <End type={localType} count_word_to_training={count_word_to_training_reproduce} setIsEnd={setIsEnd} score={score} clearScore={clearScore}/>
    
    const loadingView = <p>Loading...</p>
    
    const RoundPage = (training && ( 
        <div>
            <Header round={round} trainingLength={training.length} />
            <main className="container px-4">
                <WordCard text={training && training[round].word.translation} lvl={training && training[round].recognize_lvl} />
                <div className="mb-4">
                    <div className="mb-4">
                        <h3 className="text-center mb-3">Напишите ответ</h3>
                        <input type="text" className="form-control py-2-5 mb-2" value={selectedAnswer ? selectedAnswer : ""} onChange={handleInputChange} />
                    </div>

                    <Hint text={training[round].word.text} />
                </div>
                <AnswerButton
                    localType={localType}
                    selectedAnswer={selectedAnswer}
                    currentTraining={training}
                    setSelectedAnswer={setSelectedAnswer}
                    currentRound={round}
                    checkRound={checkRound}
                    decrementTrainingInfo={decrementTrainingInfoReproduce}
                />
            </main>
        </div>
     )) 
    const ErrorPage = <p>Error: {error}</p>;
    const NoMoreWords = (!training & (learning_words != 0) && ( 
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
     )) 

    const NoWords = <p>У вас нет слов для повторения, их надо добавить</p>


    return (
        <div className="align-items-center">
            {loading ? ( loadingView ) : (
            (isEnd && EndingPage ) ||  ( RoundPage ) ||
            (error && ErrorPage) || ( NoMoreWords ) ||  NoWords )}
        </div>
    );
}

export default Reproduce;
