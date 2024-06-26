import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { decrementTrainingInfoReproduce, fetchTraining } from "../../../common/reducers/training/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";

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

    return (
        <div className="align-items-center">
            {loading ? (
                <p>Loading...</p>
            ) : (
                (isEnd && <End type={localType} count_word_to_training={count_word_to_training_reproduce} setIsEnd={setIsEnd} score={score} clearScore={clearScore}/>) ||
                (training && (
                    <>
                        <Header round={round} trainingLength={training.length} />
                        <main className="container px-4">
                            <WordCard text={training && training[round].word.translation} lvl={training && training[round].recognize_lvl} />
                        </main>
                        <div className="px-5 mb-4">
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
                    </>
                ))
            )}
        </div>
    );
}

export default Reproduce;
