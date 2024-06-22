import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabularyStats } from "../../common/reducers/vocabularySlice";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Block from "./components/Block";

function Statistic() {
  const dispatch = useDispatch();
  const {
    recognize,
    reproduce,
    loading,
    error,
  } = useSelector((state) => state.vocabulary);

  useEffect(() => {
    dispatch(fetchVocabularyStats());
  }, [dispatch]);

  const data = {
    labels: [
      '01', '02', '03', '04', '05', '06', '07'
    ],
    datasets: [
      {
        label: 'Узнаваемость',
        data: [ 4, 11, 9, 7, 8, 3, 6 ],
        backgroundColor: '#A2ABE3',
        borderRadius: 8,
      },
      {
        label: 'Воспроизведение',
        data: [ 6, 3, 8, 7, 9, 11, 4 ],
        backgroundColor: '#f17f7f',
        borderRadius: 8,
      }
    ]
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { boxPadding: 3 }
    }
  };

  return (
    <div>
      <div className="container sticky-top mb-4 pt-2">
        <nav className="navbar dark-nav">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Статистика</a>
          </div>
        </nav>
      </div>

      <main className="container">
        <div className="my-4 w-100">
          <Bar data={data} options={options} />
        </div>

        <h5 className="mb-3">Уровни узнаваемости</h5>
        <div className="row">
          {recognize.length > 0 ? (
            recognize.map((countWords, index) => (
              <Block countWords={countWords} index={index} key={index} />
            ))
          ) : loading ? (
            "loading..."
          ) : (
            <p>Error: {error}</p>
          )}
        </div>

        <h5 className="mb-3">Уровни воспроизведения</h5>
        <div className="row mb-2">
          {reproduce.length > 0 ? (
            reproduce.map((countWords, index) => (
              <Block countWords={countWords} index={index} key={index} />
            ))
          ) : loading ? (
            "loading..."
          ) : (
            <p>Error: {error}</p>
          )}
        </div>

        <Link to="/lvl-settings" className="form-control mb-3 py-2 d-flex justify-content-between">
          <span className="text-start">Настроить уровни словаря</span>
          <span className="text-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </span>
        </Link>

        <div className="d-flex justify-content-center my-4">
          <Link to="/word-list" className="btn btn-primary save-btn py-2 w-50">
            <span>Все слова</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Statistic;