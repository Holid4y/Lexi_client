import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTraining } from "../../../common/reducers/trainingSlice";

function Recognize() {
  const dispatch = useDispatch();
  const { training, loading, error } = useSelector(state => state.training);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    dispatch(fetchTraining('recognize'));
  }, [dispatch]);

  useEffect(() => {
    if (training) {
      console.log(training)
    }
  }, [training]);

  function handleClick() {
    if (selectedAnswer !== null) {
      console.log(selectedAnswer);
    } else {
      // Если ничего не выбрано, можно вывести предупреждение или сделать кнопку неактивной
      console.log("Пожалуйста, выберите ответ");
    }
  }

  function handleAnswerChange(answer) {
    setSelectedAnswer(answer);
  }

  return (
    <div className="align-items-center">
      <div className="container navbar-blur sticky-top mb-4 pt-4">
        <span className="block_week py-4">
          <button className="btn btn-primary me-2 px-3">5</button> |{" "}
          <button className="btn btn-primary ms-2 px-3">10</button>
        </span>
      </div>

      <main className="container px-4">
        <div className="card statistic mb-5 pt-3">
          <h4 className="text-center p-2 fs-2">Hello</h4>
          <span className="fs-6">L2</span>
        </div>

        <div className="mb-4">
          <h3 className="text-center mb-3">Варианты ответа</h3>
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="option1"
            autoComplete="off"
            onChange={() => handleAnswerChange("Дом")}
          />
          <label
            className="btn btn-outline-primary w-100 mb-3 py-3"
            htmlFor="option1"
          >
            Дом
          </label>
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="option2"
            autoComplete="off"
            onChange={() => handleAnswerChange("Привет")}
          />
          <label
            className="btn btn-outline-primary w-100 mb-3 py-3"
            htmlFor="option2"
          >
            Привет
          </label>

          {/* Аналогично для остальных вариантов ответа */}
        </div>

        <button
          className={`btn btn-success w-100 py-2 ${
            selectedAnswer === null ? "disabled" : ""
          }`}
          onClick={handleClick}
        >
          Ответить
        </button>
      </main>
    </div>
  );
}

export default Recognize;
