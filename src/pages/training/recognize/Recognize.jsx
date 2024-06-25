import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTraining, fetchTrainingPatch, nextRound, addScore, clearRound, decrementTrainingInfoRecognize } from "../../../common/reducers/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";

import Header from "../Header";
import WordCard from "../WordCard";
import FalseSet from "./components/FalseSet";
import { Link } from "react-router-dom";
import End from "../End";

import Loading from "../../../common/components/Loading";

function Recognize() {
    const dispatch = useDispatch();
    const { training, round, count_word_to_training_recognize, loading, error } = useSelector((state) => state.training);
    const { learning_words } = useSelector((state) => state.home);
    const type = "recognize";
    // Создаем состояние для выбранного ответа
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Создаем состояние для массива ложных ответов
    const [falseSet, setFalseSet] = useState(null);

    // Создаем состояние для проверки последнего слова
    const [isEnd, setIsEnd] = useState(false);

    // Используем эффект для отправки запроса на получение тренировки
    useEffect(() => {
        if (!training) {
            dispatch(fetchTraining("recognize"));
            console.log("fetch");
        }

        if (!learning_words) {
            dispatch(fetchHome());
        }
    }, [dispatch]);

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
            const falseAnswers = training[round].false_set;
            const correctAnswer = {
                text: training[round].word.text,
                translation: training[round].word.translation,
            };
            setFalseSet(makeFalseSet(falseAnswers, correctAnswer));
        }
    }, [round, training]);

    function checkRound() {
        // после ответа, если это последный раунд
        if (round + 1 == training.length) {
            setIsEnd(true); // отображаем страницу окончания
            dispatch(clearRound()); // очищаем текущий round
        } else {
            dispatch(nextRound()); // следующий раунд
        }
    }

    // Функция для обработки финального ответа
    function handleFinalAnswer() {
        if (selectedAnswer !== null) {
            const is_correct = checkAnswer(selectedAnswer);
            const data = {
                type: type,
                pk: training[round].pk,
                is_correct: is_correct,
            };
            // отнимаем от информационного счетчика 1
            dispatch(decrementTrainingInfoRecognize());

            dispatch(fetchTrainingPatch(data)); // отбовляет бд

            if (is_correct) {
                // прибавляем балл за правельный ответ
                dispatch(addScore());
            }
            setSelectedAnswer(null); // Сбрасываем выбранный вариант для следующего раунда
            checkRound();
        } else {
            // Если ничего не выбрано, можно вывести предупреждение или сделать кнопку неактивной
            console.log("Пожалуйста, выберите ответ");
        }
    }

    // Функция для проверки ответа
    function checkAnswer(answerWord) {
        return training[round].word.text == answerWord;
    }

    return (
        <div className="align-items-center">
            {(isEnd && <End type={type} count_word_to_training={count_word_to_training_recognize} />) ||
                (training && (
                    <>
                        <Header />
                        <main className="container px-4">
                            <WordCard />
                            <div className="mb-4">
                                <h3 className="text-center mb-3">Варианты ответа</h3>
                                {falseSet &&
                                    falseSet.map((word, index) => (
                                        <FalseSet key={index} word={word} index={index} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
                                    ))}
                            </div>

                            <div className="d-flex justify-content-center my-4" onClick={handleFinalAnswer}>
                                <button type="text" className={`btn btn-primary save-btn py-2 w-50 ${selectedAnswer === null ? "disabled" : ""}`}>
                                    <span>
                                        <b>Ответить</b>
                                    </span>
                                </button>
                            </div>
                        </main>
                    </>
                )) ||
                (loading && <p>Loading...</p>) ||
                (error && <p>Error: {error}</p>) ||
                (!training & (learning_words != 0) && (
                    <div className="align-items-center">
                        <div className="container sticky-top mb-3 pt-2">
                            <nav className="navbar dark-nav">
                                <div className="container-fluid">
                                <span className="navbar-brand">Тестирование</span>
                                    <Link className="pt-1 color-svg" to="/profile">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                        </svg>
                                    </Link>
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
                )) || <p>У вас нет слов для повторения, их надо добавить</p>}
        </div>
    );
}

export default Recognize;
