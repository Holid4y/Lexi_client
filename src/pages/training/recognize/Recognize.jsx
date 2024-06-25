import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTraining, fetchTrainingPatch, nextRound, addScore, clearTraining, decrementTrainingInfoRecognize, setType, clearRound } from "../../../common/reducers/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";

import Header from "../Header";
import WordCard from "../WordCard";
import FalseSet from "./components/FalseSet";
import End from "../End";

import Loading from "../../../common/components/Loading";

function Recognize() {
    const dispatch = useDispatch();
    const { training, round_recognize, type, count_word_to_training_recognize, loading, patchLoading, error } = useSelector((state) => state.training);
    const { learning_words } = useSelector((state) => state.home);
    const localType = "recognize";
    const round = round_recognize
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
        // 2. Значение переменной type не равно значению переменной localType
        // 3. Переменная patchLoading имеет значение false (falsy значение)
        // Если все эти условия выполняются, то отправляем запроса на получение тренировки
        
        if ((!training | (type !== localType)) & !patchLoading) {
            dispatch(fetchTraining(localType));

        }

        if (!learning_words) {
            dispatch(fetchHome());
        }
    }, [dispatch, isEnd, type]);

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

    function checkRound() {
        // после ответа, если это последный раунд
        if (round + 1 == training.length) {
            setIsEnd(true); // отображаем страницу окончания
            dispatch(clearTraining()); // очищаем текущий training
            dispatch(clearRound()) // сбрасывает до первого слова
        } else {
            dispatch(nextRound()); // следующий раунд
        }
    }

    // Функция для обработки финального ответа
    function handleFinalAnswer() {
        if (selectedAnswer !== null) {
            const is_correct = checkAnswer(selectedAnswer);
            const data = {
                type: localType,
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
            {(loading && <p>Loading...</p>) ||
                (isEnd && <End type={localType} count_word_to_training={count_word_to_training_recognize} setIsEnd={setIsEnd} />) ||
                (training && (
                    <>
                        <Header round={round} trainingLength={training.length}/>
                        <main className="container px-4">
                            <WordCard text={training && training[round].word.text} lvl={training && training[round].recognize_lvl} />
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
                (error && <p>Error: {error}</p>) ||
                (!training & (learning_words != 0) && (
                    <>
                        <p>На данный момент, все слова повторены. </p>
                        <p>Изученных и повторенных слов: {learning_words}.</p>
                    </>
                )) || <p>У вас нет слов для повторения, их надо добавить</p>}
        </div>
    );
}

export default Recognize;
