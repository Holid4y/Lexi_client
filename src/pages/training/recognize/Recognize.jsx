import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTraining,
  fetchTrainingPatch,
  nextRound,
} from "../../../common/reducers/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";

import Header from "../Header";
import WordCard from "../WordCard";
import FalseSet from "./components/FalseSet";

import Loading from "../../../common/components/Loading";

function Recognize() {
  const dispatch = useDispatch();
  const { training, round, loading, error } = useSelector(
    (state) => state.training
  );
  const { learning_words } = useSelector((state) => state.home);

  // Создаем состояние для выбранного ответа
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Создаем состояние для массива ложных ответов
  const [falseSet, setFalseSet] = useState(null);

  // Используем эффект для отправки запроса на получение тренировки
  useEffect(() => {
    dispatch(fetchTraining("recognize"));
    if (!learning_words) {
      dispatch(fetchHome());
    }
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
        console.log("end"); 
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
      {(training && (
        <>
          <Header />
          <main className="container px-4">
            <WordCard />

            <div className="mb-4">
              <h3 className="text-center mb-3">Варианты ответа</h3>

              {falseSet &&
                falseSet.map((word, index) => (
                  <FalseSet
                    key={index}
                    word={word}
                    index={index}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                  />
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
        </>
      )) ||
        (loading && <p>Loading...</p>) ||
        (error && <p>Error: {error}</p>) ||
        (!training & (learning_words != 0) && (
          <>
            <p>На данный момент, все слова повторены. </p>
            <p>Изученных и повторенных слов: {learning_words}.</p>
          </>
        )) || <p>У вас нет слов для повторения, их надо добавить</p>}
    </div>
  );
}

export default Recognize;
