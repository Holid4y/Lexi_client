import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchTrainingInfo } from "../../common/reducers/trainingSlice";

import TrainingCard from "./TrainingCard";

function Training() {
    const dispatch = useDispatch();
    const { trainingInfo } = useSelector((state) => state.training);

    useEffect(() => {
        dispatch(fetchTrainingInfo())
    }, [dispatch]);


    return (
        <div className="align-items-center">
            <div className="container sticky-top mb-4 pt-2">
                <nav className="navbar dark-nav">
                    <div className="container-fluid">
                        <span className="navbar-brand">Тесты</span>
                    </div>
                </nav>
            </div>
            <main className="container">
                <p>количиество слов, которое надо повторить:</p>
                <p>{trainingInfo && trainingInfo.count_word_to_training_recognize}</p>
                <p>{trainingInfo && trainingInfo.count_word_to_training_reproduce}</p>
                <div className="mb-3">
                    <TrainingCard />
                </div>
            </main>
        </div>
    );
}

export default Training;
