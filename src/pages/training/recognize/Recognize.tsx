import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getTrainig, getLeargingWord } from "../common/utils";

import Header from "../components/Header";
import WordCard from "../components/WordCard";
import FalseSet from "./components/FalseSet";
import End from "../components/End";
import AnswerButton from "../components/AnswerButton";
import Loading from "../../../common/components/Treatment/Loading";
import NoMoreWordToTrainingPage from "../components/NoMoreWordToTrainingPage";
import NoWordPage from "../components/NoWordPage";
import { RootState } from "../../../store";
import { Recognize as RecoginizeClass } from "../common/training";

function Recognize() {
    const dispatch = useDispatch();
    const { count_word_to_training_recognize, loading, patchLoading, error } = useSelector((state: RootState) => state.training);
    const { training, round, score, isEnd } = useSelector((state: RootState) => state.trainingRound);
    const { learning_words } = useSelector((state: RootState) => state.home);

    const localType = "recognize";

    // Используем эффект для отправки запроса на получение тренировки
    useEffect(() => {
        getTrainig(dispatch, isEnd, patchLoading, localType);
        getLeargingWord(dispatch, learning_words);
    }, [dispatch, isEnd]);

    const LoadingView = <Loading />;
    const EndPage = <End type={localType} count_word_to_training={count_word_to_training_recognize} score={score} />;

    const TrainingPage = () => {
        if (!training) {
            return null;
        }

        const trainingObj = new RecoginizeClass(training, round)

        return (
            <div>
                <Header />
                <main className="container pb-0 mb-0">
                    <WordCard trainingObj={trainingObj}/>
                    <div className="px-5">
                        <div className="mb-4">
                            <FalseSet trainingObj={trainingObj} />
                        </div>
                        <AnswerButton localType={localType} />
                    </div>
                </main>
                
            </div>
        );
    };

    const isNoMoreWordToTraining = count_word_to_training_recognize == 0
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

export default Recognize;
