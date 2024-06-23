import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTraining, fetchTrainingPatch, nextRound } from "../../../common/reducers/trainingSlice";

function Recognize() {
  const dispatch = useDispatch();
  const { training, round, loading, error } = useSelector(state => state.training);
  
  // Создаем состояние для выбранного ответа
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Создаем состояние для массива ложных ответов
  const [falseSet, setFalseSet] = useState(null);

  // Используем эффект для отправки запроса на получение тренировки
  useEffect(() => {
    dispatch(fetchTraining('recognize'));
  }, [dispatch]);


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
    if (training){
      const falseAnswers = training[round].false_set
      const correctAnswer = {
        text: training[round].word.text,
        translation: training[round].word.translation
      }
      setFalseSet(makeFalseSet(falseAnswers, correctAnswer));
    }
    
  }, [round, training]);

  // Функция для обработки финального ответа
  function handleFinalAnswer() {
    if (selectedAnswer !== null) {
      const result = checkAnswer(selectedAnswer)
      const data = {
        type: 'recognize', 
        pk: training[round].pk, 
        is_correct: result
      }
      dispatch(fetchTrainingPatch(data)) // отбовляет бд
      setSelectedAnswer(null); // Сбрасываем выбранный вариант для следующего раунда
 
      if ((round + 1) == training.length){
        console.log('end')
      }else{
        dispatch(nextRound()) // следующий раунд
      }
    } else {
      // Если ничего не выбрано, можно вывести предупреждение или сделать кнопку неактивной
      console.log("Пожалуйста, выберите ответ");
    }
  }

  // Функция для проверки ответа
  function checkAnswer(answerWord) {
    return training[round].word.text == answerWord
  }

  // Функция для изменения выбранного ответа (переключение radio)
  function handleAnswerChange(answer) {
    setSelectedAnswer(answer);
  }
  
  return (
    <div className="align-items-center">
      <div className="container navbar-blur sticky-top mb-4 pt-4">
        <span className="block_week py-4">
          <button className="btn btn-primary me-2 px-3">{round + 1}</button> |{" "}
          <button className="btn btn-primary ms-2 px-3">{training && training.length}</button>
        </span>
      </div>

      <main className="container px-4">
        <div className="card statistic mb-5 pt-3">
          <h4 className="text-center p-2 fs-2">{training && training[round].word.text}</h4>
          <span className="fs-6">L{training && training[round].recognize_lvl}</span>
        </div>

        <div className="mb-4">
          <h3 className="text-center mb-3">Варианты ответа</h3>

          {falseSet && falseSet.map((word, index) => (
            <div key={index}>
              <input
                type="radio"
                className="btn-check"
                name="options"
                id={`option_${index}`}
                checked={selectedAnswer === word.text}
                onChange={() => handleAnswerChange(word.text)}
              />
              <label
                className="btn btn-outline-primary w-100 mb-3 py-3"
                htmlFor={`option_${index}`}
              >
                {word.translation}
              </label> 
            </div>
             
          ))}
        </div>

        <button
          className={`btn btn-success w-100 py-2 ${
            selectedAnswer === null ? "disabled" : ""
          }`}
          onClick={handleFinalAnswer}
        >
          Ответить
        </button>
      </main>
    </div>
  );
}

export default Recognize;
