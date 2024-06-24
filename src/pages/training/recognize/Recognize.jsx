import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTraining, fetchTrainingPatch, nextRound } from "../../../common/reducers/trainingSlice";
import Loading from "../../../common/components/Loading";

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
    console.log(falseSet)
    return falseSet;
  }

  // Используем эффект для создания массива ложных ответов для каждого раунда
  useEffect(() => {
    
    if (training){
      console.log(round)
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
      <p className="text-center my-3 mb-4"><b className="fs-2">{round + 1}</b> <small className="mx-2 pt-1">из</small> <b className="fs-2">{training && training.length}</b></p>
    
      {(training && 
      <main className="container">
        <div className="card statistic mb-5 pt-4 mx-4">
            <h4 className="text-center p-2">{training && training[round].word.text}</h4><span className="fs-6 ms-1">L{training && training[round].recognize_lvl}</span>
        </div>
        <div className="px-5 mb-4">
            <h3 className="text-center mb-3">Выборы ответа</h3>
            {falseSet && falseSet.map((word, index) => (
              <div key={index}>
                <input type="radio" className="btn-check" name="options" id={`option_${index}`} checked={selectedAnswer === word.text} onChange={() => handleAnswerChange(word.text)} />
                <label className="btn btn-dark-list w-100 mb-3 py-3" htmlFor={`option_${index}`} >
                  {word.translation}
                </label> 
              </div>
            ))}
        </div>
        <div className={`d-flex justify-content-center my-4 ${ selectedAnswer === null ? "disabled" : "" }`} onClick={handleFinalAnswer}>
            <button type="text" className="btn btn-primary save-btn py-2 w-50">
              <span><b>Ответить</b></span>
            </button>
        </div>
      </main> ) ||
      (loading ? <Loading /> : <p>Error: {error}</p>)}
    </div>
  );
}

export default Recognize;
