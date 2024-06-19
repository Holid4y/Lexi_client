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

      <main className="container px-4">
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
        <div className="row mb-4">
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

        <Link to="/lvl-settings" className="form-control mb-4 py-2">
          <span>Настроить уровни словаря</span>
        </Link>

        <Link to="/word-list" className="btn btn-primary w-100 mb-3">
          <span>Все слова</span>
        </Link>
      </main>
    </div>
  );
}

export default Statistic;