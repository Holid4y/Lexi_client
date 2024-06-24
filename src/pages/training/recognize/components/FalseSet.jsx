import React from "react";
import { useDispatch, useSelector } from "react-redux";

function FalseSet({word, index, selectedAnswer, setSelectedAnswer}) {
  // Функция для изменения выбранного ответа (переключение radio)
  function handleAnswerChange(answer) {
    setSelectedAnswer(answer);
  }
  return (
      <div>
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
  );
}

export default FalseSet;
