import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

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

import { Reproduce as ReproduceClass } from "../common/training";

function Reproduce() {
    const dispatch = useDispatch();

    const { count_word_to_training_reproduce, loading, patchLoading } = useSelector((state: RootState) => state.training);
    const { training, round, score, isEnd } = useSelector((state: RootState) => state.trainingRound);
    const { learning_words } = useSelector((state: RootState) => state.home);

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
        const trainingObj = new ReproduceClass(training, round)

        return (
            <div>
                <Header />
                <main className="container pb-0 mb-0">
                    <WordCard trainingObj={trainingObj}/>
                    <div className="px-5">
                        <div>
                            <TextInput correctWord={training[round].word.text} />
                            <Hint text={training[round].word.text} />
                        </div>
                        <AnswerButton trainingObj={trainingObj} />
                    </div>
                </main>
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
                ((isNoMoreWordToTraining && !isEnd) && <NoMoreWordToTrainingPage />) ||
                (isNoWord && <NoWordPage />)
            }
            {isEnd && EndPage}
        </div>
    );
}

export default Reproduce;
