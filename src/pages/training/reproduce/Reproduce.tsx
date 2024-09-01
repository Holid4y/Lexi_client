import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTrainig, getLeargingWord } from "../common/utils";

import Header from "../components/Header";
import WordCard from "../components/WordCard";
import End from "../components/end-page/End";
import Hint from "./components/Hint";
import AnswerButton from "../components/AnswerButton";
import TextInput from "./components/TextInput";
import Loading from "../../../common/components/Treatment/Loading";
import NoMoreWordToTrainingPage from "../components/NoMoreWordToTrainingPage";
import NoWordPage from "../components/NoWordPage";

import { Round } from "../common/round";
import { Reproduce as ReproduceClass } from "../common/training"

function Reproduce() {
    const dispatch = useDispatch();
    const commonUseSelector = useSelector

    const { count_word_to_training_reproduce, loading, patchLoading } = useSelector((state: any) => state.training);

    const { learning_words } = useSelector((state: any) => state.home);
    
    const trainingObj = new ReproduceClass(dispatch, commonUseSelector);
    const roundObj = new Round(dispatch, commonUseSelector);


    // Используем эффект для отправки запроса на получение тренировки
    useEffect(() => {
        getTrainig(dispatch, roundObj.isEnd, patchLoading, trainingObj.type);
        getLeargingWord(dispatch, learning_words);
    }, [roundObj.isEnd]);

    const EndPage = <End count_word_to_training={count_word_to_training_reproduce} roundObj={roundObj} trainingObj={trainingObj} />;

    const TrainingPage = () => {
        if (trainingObj.training === null) {
            return null
        }

        return (
            <div>
                <Header roundObj={roundObj}/>
                <main className="container pb-0 mb-0">
                    <WordCard trainingObj={trainingObj}/>
                    <div className="px-5">
                        <div>
                            <TextInput roundObj={roundObj} trainingObj={trainingObj} />
                            <Hint trainingObj={trainingObj} />
                        </div>
                        <AnswerButton roundObj={roundObj} trainingObj={trainingObj} />
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
                loading ? <Loading /> : 
                TrainingPage() ||
                ((isNoMoreWordToTraining && !roundObj.isEnd) && <NoMoreWordToTrainingPage />) ||
                (isNoWord && <NoWordPage />)
            }
            {roundObj.isEnd && EndPage}

        </div>
    );
}

export default Reproduce;
