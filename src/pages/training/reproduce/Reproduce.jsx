import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTrainig, getLeargingWord } from "../common/utils";

import Header from "../components/Header";
import WordCard from "../components/WordCard";
import End from "../components/End";
import Hint from "./components/Hint";
import AnswerButton from "../components/AnswerButton";
import TextInput from "./components/TextInput";
import Loading from "../../../common/components/Treatment/Loading";
import NoMoreWordToTrainingPage from "../components/NoMoreWordToTrainingPage";
import NoWordPage from "../components/NoWordPage";

function Reproduce() {
    const dispatch = useDispatch();

    const { count_word_to_training_reproduce, loading, patchLoading, error } = useSelector((state) => state.training);
    const { training, round, score, isEnd } = useSelector((state) => state.trainingRound);
    const { learning_words } = useSelector((state) => state.home);

    const localType = "reproduce";

    // Используем эффект для отправки запроса на получение тренировки
    useEffect(() => {
        getTrainig(dispatch, isEnd, patchLoading, localType);
        getLeargingWord(dispatch, learning_words);
    }, [dispatch, isEnd]);

    const LoadingView = <Loading />;
    const EndPage = <End type={localType} count_word_to_training={count_word_to_training_reproduce} score={score} />;

    const TrainingPage = () => {
        if (!training) {
            return null
        }

        return (
            <div className="container mb-4">
                <Header />
                <main>
                    <WordCard localType={localType} text={training[round].word.translation} />
                </main>
                <div className="">
                    <TextInput correctWord={training[round].word.text} />

                    <Hint text={training[round].word.text} />
                </div>
                <AnswerButton localType={localType} />
            </div>
        )
    };

    const isNoMoreWordToTraining = count_word_to_training_reproduce == 0

    const isNoWord = learning_words == 0

    return (
        <div className="align-items-center">
            {
                loading ? LoadingView : 
                TrainingPage() || 
                ((isNoMoreWordToTraining & !isEnd) && <NoMoreWordToTrainingPage />) ||
                (isNoWord && <NoWordPage />)
            }
            {isEnd && EndPage}
        </div>
    );
}

export default Reproduce;
