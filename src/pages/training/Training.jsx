import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainingInfo } from "../../common/reducers/training/trainingSlice";

import TrainingCard from "./TrainingCard";

function Training() {
    const dispatch = useDispatch();
    const { count_word_to_training_recognize, count_word_to_training_reproduce } = useSelector((state) => state.training);

    useEffect(() => {
        dispatch(fetchTrainingInfo())
    }, [dispatch]);


    return (
        <div className="align-items-center">
            <div className="container sticky-top mb-3 pt-2">
                <nav className="navbar dark-nav">
                    <div className="container-fluid">
                        <span className="navbar-brand">Тестирование</span>
                    </div>
                </nav>
            </div>
            <main className="container">
                <div className="py-4">
                    <div className="row align-items-center g-lg-4">
                        <div className="col-lg-7 text-center text-lg-start mb-3">
                            <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Необходимо пройти</h1>
                            <span className="col-lg-10 fs-4">Тест с выбором ответа <b>{count_word_to_training_recognize && count_word_to_training_recognize}</b> слова </span><br />
                            <span className="col-lg-10 fs-4">Тест на узнаваемость <b>{count_word_to_training_reproduce && count_word_to_training_reproduce}</b> слова </span>
                        </div>
                        <div className="col-md-10 mx-auto col-lg-5">
                            <TrainingCard />
                        </div>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Наш сайт предлагает возможность проверить свои знания английского языка с помощью двух видов тестов:</h5>
                        <h6 className="card-subtitle mb-3 text-muted">1. Тесты с вариантами выбора ответа</h6>
                        <p className="card-text">
                            Эти тесты позволяют вам выбирать правильный ответ из нескольких предложенных вариантов. Вы можете настроить количество ложных вариантов от 3 до 10, чтобы сделать тесты более сложными или, наоборот, упрощенными. Такой формат идеально подходит для тех, кто хочет быстро проверить свои знания и потренировать навыки понимания английского языка.
                        </p>
                        <ul>
                            <li>Настраиваемое количество ложных вариантов (от 3 до 10)</li>
                            <li>Быстрая проверка знаний</li>
                            <li>Удобный интерфейс</li>
                        </ul>
                        <h6 className="card-subtitle mb-3 text-muted">2. Тесты на узнаваемость</h6>
                        <p className="card-text">
                            В этом виде тестов вам предлагается перевести русское слово на английский язык. Этот формат тестирования помогает улучшить словарный запас и навыки перевода, что является важным для свободного владения языком.
                        </p>
                        <ul>
                            <li>Развитие навыков перевода</li>
                            <li>Расширение словарного запаса</li>
                            <li>Укрепление знаний английского языка</li>
                        </ul>
                        <p className="card-text">
                            Пройдите наши тесты и убедитесь в своих знаниях английского языка! Независимо от вашего уровня, у нас вы найдете подходящее задание, которое поможет вам в изучении и совершенствовании английского.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Training;
