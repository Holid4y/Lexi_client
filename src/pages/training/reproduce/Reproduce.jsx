import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function shuffleText(text) {
    return text
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

function Reproduce() {
    const dispatch = useDispatch();
    const { training, round, loading, error } = useSelector((state) => state.training);
    const { learning_words } = useSelector((state) => state.home);

    const [buttonClasses, setButtonClasses] = useState("form-control py-2 disabled placeholder");
    const [buttonText, setButtonText] = useState("white");
    const [isClicked, setIsClicked] = useState(false);

    const handleButtonClick = () => {
        setButtonClasses("form-control py-2");
        setButtonText(shuffleText(buttonText));
        setIsClicked(true);
    };

    // Создаем состояние для выбранного ответа
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Создаем состояние для массива ложных ответов
    const [falseSet, setFalseSet] = useState(null);

    // Используем эффект для отправки запроса на получение тренировки
    // useEffect(() => {
    //     if (!training) {
    //         dispatch(fetchTraining("recognize"));
    //         console.log('fetch')
    //     }

    //     if (!learning_words) {
    //         dispatch(fetchHome());
    //     }
    // }, [dispatch]);

    // Функция для создания массива ложных ответов
    function makeFalseSet(falseAnswers, correctAnswer) {
        const falseSet = [...falseAnswers];
        falseSet.push(correctAnswer);

        // Перемешиваем элементы массива с помощью алгоритма Фишера-Йетса
        for (let i = falseSet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [falseSet[i], falseSet[j]] = [falseSet[j], falseSet[i]];
        }
        return falseSet;
    }

    // Используем эффект для создания массива ложных ответов для каждого раунда
    useEffect(() => {
        if (training) {
            const falseAnswers = training[round].false_set;
            const correctAnswer = {
                text: training[round].word.text,
                translation: training[round].word.translation,
            };
            setFalseSet(makeFalseSet(falseAnswers, correctAnswer));
        }
    }, [round, training]);

    // Функция для обработки финального ответа
    function handleFinalAnswer() {
        if (selectedAnswer !== null) {
            const result = checkAnswer(selectedAnswer);
            const data = {
                type: "recognize",
                pk: training[round].pk,
                is_correct: result,
            };
            dispatch(fetchTrainingPatch(data)); // отбовляет бд
            setSelectedAnswer(null); // Сбрасываем выбранный вариант для следующего раунда

            if (round + 1 == training.length) {
                console.log("end", 'надо очистить store');
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
            <p className="text-center my-3 mb-4">
                <b className="fs-2">3</b> <small className="mx-2 pt-1">из</small> <b className="fs-2">8</b>
            </p>

            <main className="container">
                <div className="card statistic mb-5 pt-4 mx-4">
                    <h4 className="text-center p-2">Белый</h4>
                    <span className="fs-6 ms-1">L4</span>
                </div>

                <div className="px-5 mb-4">
                    <div className="mb-4">
                        <h3 className="text-center mb-3">Напишите ответ</h3>
                        <input type="text" className="form-control py-2-5 mb-2" />
                    </div>

                    <div className="mb-4">
                        <button type="text" className={buttonClasses} onClick={handleButtonClick} disabled={isClicked}>
                            <h1>{buttonText}</h1>
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
            </main>
        </div>
    );
}

export default Reproduce;
