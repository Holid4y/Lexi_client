import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../../common/reducers/homeSlice";

import Navigation from "../../common/components/Navigation";
import InfoCard from "./components/InfoCard";
import TrainingCard from "./components/TrainingCard";
import BooksLinkCard from "./components/BooksLinkCard";



function Home() {
  const dispatch = useDispatch();
  const {
    count_recognize_to_learn,
    count_reproduce_to_learn,
    learning_words,
    new_words_today,
    upload_books,
    loading,
    error,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  const log = {
    learning_words: learning_words,
    loading: loading,
    error: error,
  };
  console.log(log);


  return (
    <div className="align-items-center">
      <div className="container navbar-blur sticky-top mb-4 pt-4">
        <div className="row row-cols-7 g-2">
          <div className="block_week col bg-danger">
            <span>пн</span>
          </div>
          <div className="block_week col bg-danger">
            <span>вт</span>
          </div>
          <div className="block_week col">
            <span>ср</span>
          </div>
          <div className="block_week col">
            <span>чт</span>
          </div>
          <div className="block_week col bg-success">
            <span>пт</span>
          </div>
          <div className="block_week col bg-success">
            <span>сб</span>
          </div>
          <div className="block_week col">
            <span>вс</span>
          </div>
        </div>
      </div>

      <main className="container px-4">

        <InfoCard />

        <TrainingCard />

        <BooksLinkCard />
                
        {/* <div className="row mb-4 g-4">
          <a className="col-6 col-md-4" href="#">
            <div className="card position-relative bg-card-dark card-btn">
              <div className="card-body text-center py-3">
                Все книги
                
              </div>
              <span className="position-absolute top-0 start-90 translate-middle badge-seccses">
                15
              </span>
            </div>
          </a>
          <a className="col-6 col-md-4" href="#">
            <div className="card position-relative bg-card-dark card-btn">
              <div className="card-body text-center py-3">
                Все слова
                
              </div>
              <span className="position-absolute top-0 start-90 translate-middle badge-seccses">
                17
              </span>
            </div>
          </a>
        </div> */}
      </main>
    </div>
  );
}

export default Home;
