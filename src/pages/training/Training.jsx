import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainingInfo } from "../../common/reducers/trainingSlice";
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
                        <Link className="pt-1 color-svg" to="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                            </svg>
                        </Link>
                    </div>
                </nav>
            </div>
            <main className="container">
                <div class="py-4">
                    <div class="row align-items-center g-lg-4">
                        <div class="col-lg-7 text-center text-lg-start mb-3">
                            <h1 class="display-4 fw-bold lh-1 text-body-emphasis">Необходимо пройти</h1>
                            <span class="col-lg-10 fs-4">Тест с выбором ответа <b>{count_word_to_training_recognize && count_word_to_training_recognize}</b> слова </span><br />
                            <span class="col-lg-10 fs-4">Тест на узнаваемость <b>{count_word_to_training_reproduce && count_word_to_training_reproduce}</b> слова </span>
                        </div>
                        <div class="col-md-10 mx-auto col-lg-5">
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
