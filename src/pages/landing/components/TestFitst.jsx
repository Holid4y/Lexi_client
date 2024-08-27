import React, { useState, useEffect } from 'react';

const TestFitst = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showFinishButton, setShowFinishButton] = useState(false);

    const questions = [
        { word: 'Door', correctAnswer: 'Дверь', options: ['Окно', 'Дверь', 'Кровать'], part_of_speech: "сущ" },
        { word: 'Bed', correctAnswer: 'Кровать', options: ['Шкаф', 'Кровать', 'Лампа'], part_of_speech: "сущ" },
        { word: 'Carpet', correctAnswer: 'Ковер', options: ['Диван', 'Зеркало', 'Ковер'], part_of_speech: "сущ" },
        { word: 'Mirror', correctAnswer: 'Зеркало', options: ['Полка', 'Зеркало', 'Окно'], part_of_speech: "сущ" },
        { word: 'Shelf', correctAnswer: 'Полка', options: ['Книга', 'Полка', 'Кресло'], part_of_speech: "сущ" },
        { word: 'Sofa', correctAnswer: 'Диван', options: ['Стол', 'Диван', 'Кровать'], part_of_speech: "сущ" },
        { word: 'Pencil', correctAnswer: 'Карандаш', options: ['Карандаш', 'Линейка', 'Тетрадь'], part_of_speech: "сущ" },
        { word: 'Notebook', correctAnswer: 'Тетрадь', options: ['Тетрадь', 'Ручка', 'Линейка'], part_of_speech: "сущ" },
        { word: 'Pen', correctAnswer: 'Ручка', options: ['Карандаш', 'Ручка', 'Тетрадь'], part_of_speech: "сущ" },
        { word: 'Ruler', correctAnswer: 'Линейка', options: ['Книга', 'Линейка', 'Карандаш'], part_of_speech: "сущ" },
        { word: 'Cup', correctAnswer: 'Чашка', options: ['Чашка', 'Тарелка', 'Вилка'], part_of_speech: "сущ" },
        { word: 'Plate', correctAnswer: 'Тарелка', options: ['Ложка', 'Тарелка', 'Нож'], part_of_speech: "сущ" },
        { word: 'Spoon', correctAnswer: 'Ложка', options: ['Вилка', 'Ложка', 'Тарелка'], part_of_speech: "сущ" },
        { word: 'Fork', correctAnswer: 'Вилка', options: ['Нож', 'Вилка', 'Ложка'], part_of_speech: "сущ" },
        { word: 'Knife', correctAnswer: 'Нож', options: ['Нож', 'Чашка', 'Тарелка'], part_of_speech: "сущ" },
        { word: 'Television', correctAnswer: 'Телевизор', options: ['Книга', 'Телевизор', 'Окно'], part_of_speech: "сущ" },
        { word: 'Refrigerator', correctAnswer: 'Холодильник', options: ['Шкаф', 'Холодильник', 'Стол'], part_of_speech: "сущ" },
        { word: 'Microwave', correctAnswer: 'Микроволновка', options: ['Микроволновка', 'Кухня', 'Полка'], part_of_speech: "сущ" },
        { word: 'Toaster', correctAnswer: 'Тостер', options: ['Лампа', 'Тостер', 'Чайник'], part_of_speech: "сущ" },
        { word: 'Kettle', correctAnswer: 'Чайник', options: ['Чашка', 'Тостер', 'Чайник'], part_of_speech: "сущ" }
    ];

    useEffect(() => {
        const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
        setShuffledQuestions(shuffled);
    }, []);

    const handleAnswerSelect = (answer) => {
        if (selectedAnswer) return;

        setSelectedAnswer(answer);
        if (answer === shuffledQuestions[currentQuestion].correctAnswer) {
            setIsCorrect(true);
            setScore((prevScore) => prevScore + 1);
        } else {
            setIsCorrect(false);
        }

        if (currentQuestion === shuffledQuestions.length - 1) {
            setShowFinishButton(true);
        } else {
            setTimeout(() => {
                setCurrentQuestion((prev) => prev + 1);
                setSelectedAnswer(null);
                setIsCorrect(null);
            }, 1000);
        }
    };

    const handleFinishTest = () => {
        setShowResults(true);
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setScore(0);
        setShowResults(false);
        setShowFinishButton(false);
        const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
        setShuffledQuestions(shuffled);
    };

    if (showResults) {
        return (
            <div className="container text-center">
                <h3>Вы завершили тест!</h3>
                <p>Ваш результат: {score} из {shuffledQuestions.length}</p>
                <button className="btn btn-primary mt-3" onClick={handleRestart}>Пройти заново</button>
            </div>
        );
    }

    return (
        <div className='container'>
            <div className="row g-2">
                <div className="col-12">
                    <div>
                        <p className="text-center my-3 mb-4">
                            <b className="fs-2">{currentQuestion + 1}</b> <small className="mx-2 pt-1">из</small> <b className="fs-2">{shuffledQuestions.length}</b>
                        </p>
                        <div className="my-5">
                            <div className="card statistic py-5">
                                <h4 className="text-center">{shuffledQuestions[currentQuestion]?.word}</h4>
                                <span className="text-center p-0 text-warning">{shuffledQuestions[currentQuestion]?.word}</span>
                                <div className="word_transcription p-0 m-0">
                                    <span>[{shuffledQuestions[currentQuestion]?.word}]</span>
                                </div>
                                <div className="card-left-lg">
                                    <div className="card_block_lvl">
                                        <p className="card_block_lvl_span">
                                            <b>{`1 lvl`}</b>
                                        </p>
                                    </div>
                                    <div>
                                        <span className="ps-2">сущ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 d-flex justify-content-center">
                            <div className="w-75">
                                <h3 className="text-center mb-3">Варианты ответа</h3>
                                {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
                                    <div key={index}>
                                        <input 
                                            type="radio" 
                                            className="btn-check" 
                                            name="options" 
                                            id={`option_${index}`} 
                                            disabled={selectedAnswer !== null}
                                        />
                                        <label
                                            className={`btn ${selectedAnswer === option ? (isCorrect === true ? 'box-success' : isCorrect === false ? 'box-danger' : '') : ''} btn-dark-list position-relative w-100 mb-3 py-3`}
                                            htmlFor={`option_${index}`}
                                            onClick={() => handleAnswerSelect(option)}
                                        >
                                            {option}
                                        </label>
                                    </div>
                                ))}
                                {showFinishButton && (
                                    <button className="btn btn-primary w-100 mt-3" onClick={handleFinishTest}>Показать результат</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestFitst;
