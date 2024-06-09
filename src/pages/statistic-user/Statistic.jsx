import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchVocabularyStats } from "../../common/reducers/vocabularySlice";

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
  
  const log = {
    recognize: recognize,
    reproduce: reproduce,
    loading: loading,
    error: error,
  };
  //   console.log(log)

  return (
    <div>
      <div class="container sticky-top mb-4 pt-2">
        <nav class="navbar dark-nav">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Статистика
            </a>
          </div>
        </nav>
      </div>

      <main class="container px-4">
        <h5 class="mb-3">Уровни узнаваемости</h5>
        <div class="row">
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

        <h5 class="mb-3">Уровни воспроизведения</h5>
        <div class="row mb-4">
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

        <Link to="/lvl-settings" class="form-control mb-4 py-2">
          <span>Настроить уровни словаря</span>
        </Link>

        <Link to="/word-list" class="btn btn-primary w-100 mb-3">
          <span>Все слова</span>
        </Link>
      </main>
    </div>
  );
}

export default Statistic;
