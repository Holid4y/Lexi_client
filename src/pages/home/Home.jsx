import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../../common/reducers/homeSlice";

import Navigation from "../../common/components/Navigation";
import InfoCard from "./components/InfoCard";
import TrainingCard from "./components/TrainingCard";
import BooksLinkCard from "./components/BooksLinkCard";
import WorsHistory from "./components/WorsHistory";


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



  return (
    <div className="align-items-center">
      <div className="container navbar-blur sticky-top mb-4 pt-4">
        <div className="row row-cols-7 g-2">
          <div className="block_week col bg-danger">
            <span>пн</span>
            <div className="additional-text">+3</div>
          </div>
          <div className="block_week col bg-danger">
            <span>вт</span>
            <div className="additional-text">+7</div>
          </div>
          <div className="block_week col">
            <span>ср</span>
            <div className="additional-text">+10</div>
          </div>
          <div className="block_week col">
            <span>чт</span>
            <div className="additional-text">0</div>
          </div>
          <div className="block_week col bg-success">
            <span>пт</span>
            <div className="additional-text">-7</div>
          </div>
          <div className="block_week col bg-success">
            <span>сб</span>
            <div className="additional-text">+2</div>
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

        <WorsHistory />
              
      </main>
    </div>
  );
}

export default Home;
