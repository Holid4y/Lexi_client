import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTraining, fetchTrainingPatch, nextRound, addScore, clearTraining, decrementTrainingInfoRecognize } from "../../../common/reducers/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";

import Header from "../Header";
import WordCard from "../WordCard";
import End from "../End";

import Loading from "../../../common/components/Loading";

function shuffleText(text) {
    return text
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

function Reproduce() {
    const dispatch = useDispatch();
    const { training, round_reproduce, type, count_word_to_training_reproduce, loading, patchLoading, error } = useSelector((state) => state.training);
    const { learning_words } = useSelector((state) => state.home);

    // Создаем состояние для проверки последнего слова
    const [isEnd, setIsEnd] = useState(false);
    const round = round_reproduce;
    const localType = "reproduce";

    // --- логика отображения подсказок
    const [isOpen, setIsOpen] = useState(false);

    // Используем эффект для отправки запроса на получение тренировки
    useEffect(() => {
        // Проверяем, что выполняются следующие условия:
        // 1. Массив training либо пустой, либо не существует (training является falsy значением)
        // 2. Значение переменной type не равно значению переменной localType
        // 3. Переменная patchLoading имеет значение false (falsy значение)
        // Если все эти условия выполняются, то отправляем запроса на получение тренировки
        if ((!training || type !== localType) && !patchLoading) {
            dispatch(fetchTraining(localType));
        }
        if (!learning_words) {
            dispatch(fetchHome());
        }
    }, [dispatch, isEnd, type]);

    // Функция для обработки финального ответа
    function handleFinalAnswer() {
        if (selectedAnswer !== null) {
            const result = checkAnswer(selectedAnswer);
            const data = {
                type: localType,
                pk: training[round].pk,
                is_correct: result,
            };
            dispatch(fetchTrainingPatch(data)); // отбовляет бд
            setSelectedAnswer(null); // Сбрасываем выбранный вариант для следующего раунда

            if (round + 1 == training.length) {
                console.log("end", "надо очистить store");
            } else {
                dispatch(nextRound()); // следующий раунд
            }
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
                (isEnd && <End type={localType} count_word_to_training={count_word_to_training_reproduce} setIsEnd={setIsEnd} />) ||
                (training && (
                    <>
                        <Header round={round} trainingLength={training.length} />
                        <main className="container px-4">
                            <WordCard text={training && training[round].word.translation} lvl={training && training[round].reproduce_lvl} />
                        </main>
                    </>
                ))}

            <div className="px-5 mb-4">
                <div className="mb-4">
                    <h3 className="text-center mb-3">Напишите ответ</h3>
                    <input type="text" className="form-control py-2-5 mb-2" />
                </div>

                <div className="mb-4">
                    <button type="text" className={isOpen ? "form-control py-2" : "form-control py-2 disabled placeholder"} onClick={() => setIsOpen(true)} disabled={isOpen}>
                        <h1>fff</h1>
                    </button>
                    <small className="">Если затрудняетесь ответить, нажмите на блок с подсказкой</small>
                </div>
            </div>
            <div className="d-flex justify-content-center my-4">
                <button type="text" className="btn btn-primary save-btn py-2 w-50">
                    <span>
                        <b>Ответить</b>
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Reproduce;
