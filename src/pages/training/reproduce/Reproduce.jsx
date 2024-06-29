import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTrainig, getLeargingWord } from "../common/utils";

import Header from "../components/Header";
import WordCard from "../components/WordCard";
import End from "../components/End";
import Hint from "./components/Hint";
import AnswerButton from "../components/AnswerButton";
import TextInput from "./components/TextInput";

function Reproduce() {
    const dispatch = useDispatch();

    const { count_word_to_training_reproduce, loading, patchLoading, error } = useSelector((state) => state.training);
    const { training, round, score } = useSelector((state) => state.trainingRound);
    const { learning_words } = useSelector((state) => state.home);

    // Создаем состояние для проверки последнего слова
    const [isEnd, setIsEnd] = useState(false);
    const [isViewResult, setIsViewResult] = useState(false);

    const localType = "reproduce";

    // Используем эффект для отправки запроса на получение тренировки
    useEffect(() => {
        getTrainig(dispatch, isEnd, patchLoading, localType);
        getLeargingWord(dispatch, learning_words);
    }, [dispatch, isEnd]);

    return (
        <div className="align-items-center">
            {loading ? (
                <p>Loading...</p>
            ) : (
                (isEnd && <End type={localType} count_word_to_training={count_word_to_training_reproduce} setIsEnd={setIsEnd} score={score} />) ||
                (training && (
                    <>
                        <Header round={round} trainingLength={training.length} />
                        <main className="container px-4">
                            <WordCard text={training && training[round].word.translation} lvl={training && training[round].recognize_lvl} />
                        </main>
                        <div className="px-5 mb-4">
                            <TextInput correctWord={training[round].word.text} isViewResult={isViewResult} />

                            <Hint text={training[round].word.text} />
                        </div>
                        <AnswerButton localType={localType} currentTraining={training} setIsEnd={setIsEnd} setIsViewResult={setIsViewResult} />
                    </>
                ))
            )}
        </div>
    );
}

export default Reproduce;
