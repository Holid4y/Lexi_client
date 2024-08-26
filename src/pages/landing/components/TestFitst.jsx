import React, { useState } from 'react';

const TestFitst = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const questions = [
        { word: 'Table', correctAnswer: 'Стол', options: ['Стол', 'Книга', 'Пол', 'Кресло'] },
        { word: 'Window', correctAnswer: 'Окно', options: ['Дверь', 'Окно', 'Лампа', 'Потолок'] },
        { word: 'Chair', correctAnswer: 'Стул', options: ['Кресло', 'Полка', 'Стул', 'Диван'] },
        { word: 'Book', correctAnswer: 'Книга', options: ['Телевизор', 'Книга', 'Карандаш', 'Ручка'] },
        { word: 'Lamp', correctAnswer: 'Лампа', options: ['Стол', 'Стул', 'Лампа', 'Кровать'] }
        
    ];

    const handleAnswerSelect = (answer) => {
        if (selectedAnswer) return; // Если уже выбран ответ, не даем выбрать снова
        
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestion].correctAnswer) {
            setIsCorrect(true);
            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion((prev) => prev + 1);
                    setSelectedAnswer(null);
                    setIsCorrect(null);
                }
            }, 1000);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <div className='container'>
            <div className="row g-2 py-5">
                <div className="col-12">
                    <h1 className="fw-bold text-body-emphasis mb-3 text-center">Тестирование с выбором ответа</h1>
                    <p className="lead">Тесты основаны на словах, которые вы добавили в свой словарь. Проходите тесты, чтобы закрепить свои знания. (пример ниже)</p>
                </div>
                <div className="col-12">
                    <div>
                        <p className="text-center my-3 mb-4">
                            <b className="fs-2">{currentQuestion + 1}</b> <small className="mx-2 pt-1">из</small> <b className="fs-2">{questions.length}</b>
                        </p>
                        <div className="card statistic mb-5 pt-4">
                            <h4 className="text-center p-2 unselect">{questions[currentQuestion].word}</h4>
                            <span className="fs-6 ms-1">L1</span>
                        </div>
                        <div className="mb-4 d-flex justify-content-center">
                            <div className="w-75">
                                <h3 className="text-center mb-3">Варианты ответа</h3>
                                {questions[currentQuestion].options.map((option, index) => (
                                    <div key={index}>
                                        <input 
                                            type="radio" 
                                            className="btn-check" 
                                            name="options" 
                                            id={`option_${index}`} 
                                            disabled={selectedAnswer !== null} // Блокируем инпут после выбора
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
                                {isCorrect === false && <button className="btn btn-primary w-100 mt-3" onClick={() => {
                                    setCurrentQuestion((prev) => prev + 1);
                                    setSelectedAnswer(null);
                                    setIsCorrect(null);
                                }}>Продолжить</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestFitst;
